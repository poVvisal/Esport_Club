# Dockerfile for APIGateway_Microservice
# This uses a multi-stage build to create a small and secure production image.

# --- Build Stage ---
# This stage installs dependencies and prepares the application.
FROM node:18-slim AS builder
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# --- Production Stage ---
# This stage creates the final, lean image.
FROM node:18-slim

# Install dumb-init for proper signal handling
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*

# Create a non-root user for security
RUN groupadd --system nodeuser && useradd --system --gid nodeuser nodeuser

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Copy application source code
COPY . .

# Set ownership of the application files to the non-root user
RUN chown -R nodeuser:nodeuser /usr/src/app

# Switch to the non-root user
USER nodeuser

# Expose the port the service will run on
EXPOSE 4000

# Use dumb-init to start the application
# This ensures that signals like SIGTERM are handled correctly by Node.js.
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Command to run the application
CMD ["node", "api-gateway.js"]
