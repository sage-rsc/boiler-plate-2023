FROM node:latest
LABEL authors="revelation"
# Working setup
WORKDIR /usr/app
# Install dependencies
COPY package*.json .
RUN npm install
# Copy bundle app source
COPY . .
# Exposs port server
EXPOSE 3000
# Expose port socket
EXPOSE 3010
# Make a command
# CMD npm start
