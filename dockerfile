# Build stage
FROM node:20-alpine AS builder

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Start the server
CMD [ "node", "dist/app.js" ]