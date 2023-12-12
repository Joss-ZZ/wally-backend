# Use a Node.js Alpine-based image for the development stage
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Define the command to start your application in development mode
ENTRYPOINT ["/bin/sh", "-c", "npm run start:dev"]