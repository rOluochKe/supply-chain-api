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
EXPOSE 3000

# Set the environment variables for the database connection
ENV DB_USERNAME=supply_chain_usr
ENV DB_PASSWORD=@supply_chain_trace_usr23!
ENV DB_DATABASE=supply_chain_track

# Copy the init.sql file to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Install the wait-on package globally
RUN npm install -g wait-on

# Wait for the database to be ready before running the seed script
CMD sh -c "wait-on tcp:database:5432 && npm run seed && npm run lint && npm run format && npm start"
