# Use a base image suitable for your application
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock or package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
