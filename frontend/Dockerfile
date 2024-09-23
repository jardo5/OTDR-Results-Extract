# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:stable-alpine

# Copy the build output to nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the uncommon port
EXPOSE 5300

# Start nginx
CMD ["nginx", "-g", "daemon off;"]