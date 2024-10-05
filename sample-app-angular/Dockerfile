# Use the official Node.js image as a base image
FROM node:latest

# Create a directory for the app files and set it as the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) for installing dependencies
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application
RUN ng build

# Use a lightweight Node.js image to serve the application
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the build output from the previous stage
COPY --from=0 /usr/src/app/sample-app-server/www/ /usr/src/app/dist/

# Install a simple static file server
RUN npm install -g serve

# Expose port 4200
EXPOSE 4200

# Command to serve the application
CMD ["serve", "-s", "dist", "-l", "4200"]
