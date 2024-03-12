# Use a Node.js Alpine-based image for the development stage
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install application dependencies using `npm install`
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application 
RUN npm run build

# Expose the port on which the app will run
EXPOSE 8000

# Define the command to start your application in prod mode
ENTRYPOINT ["npm", "run", "start:prod"]
