const Queue = require('bull');
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Create a queue for n8n webhooks
const n8nQueue = new Queue('n8n', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

// Process jobs from the queue
n8nQueue.process(async (job) => {
  console.log(`Processing job ${job.id}:`, job.data);
  
  try {
    // Trigger n8n webhook or perform async work
    const response = await fetch(job.data.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job.data),
    });
    
    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }
    
    return { success: true, jobId: job.id };
  } catch (error) {
    console.error(`Job ${job.id} failed:`, error.message);
    throw error;
  }
});

// Event listeners
n8nQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

n8nQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

n8nQueue.on('error', (error) => {
  console.error('Queue error:', error);
});

console.log('Worker started, listening for jobs...');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down worker...');
  await n8nQueue.close();
  process.exit(0);
});
