# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the server will run
EXPOSE 4000

# Set the environment variables for the database connection
ENV DB_USERNAME=supply_chain_usr
ENV DB_PASSWORD=@supply_chain_trace_usr23!
ENV DB_DATABASE=supply_chain_track

# Copy the init.sql file to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Install the wait-on package globally
RUN npm install -g wait-on

# Run format during the build process
RUN npm run format

# Run lint during the build process
RUN npm run lint

# Run the seed script once during the build process
CMD wait-on tcp:database:5432 && npm run seed && npm start