# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package files
COPY . .

# Install dependencies
RUN npm install

# Build the Quasar app
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy built files from build stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Create directories for storage and logs (will be mounted from host)
RUN mkdir -p /app/storage/brand_kits \
    /app/storage/scheduled_posts \
    /app/storage/media \
    /app/storage/generated_history \
    /app/storage/archive \
    /app/logs

# Set proper permissions for mounted volumes
RUN chmod -R 755 /app/storage /app/logs

# Optional: Copy a simple API handler if you need to serve storage files
# (if your app needs to serve generated files back to users)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
