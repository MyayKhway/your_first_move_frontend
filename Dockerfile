# Use an official Node runtime as the base image
FROM node:18-alpine AS build

# Set build arguments
ARG VITE_API_BASE_URL
ARG VERSION

# Set environment variables for Vite build
ENV VITE_API_BASE_URL=$VITE_API_URL

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build artifacts from build stage
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
