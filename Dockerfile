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

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
