FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with npm ci for better reliability
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Start server (migrations run automatically)
CMD ["npm", "start"]
