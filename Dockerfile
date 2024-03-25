# Use Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

RUN npm cache clean --force
# Install dependencies
RUN npm install
RUN npm install -g typescript

# Copy the rest of the application code to work directory
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
