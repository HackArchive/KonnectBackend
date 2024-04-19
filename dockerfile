FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port and start the application
EXPOSE 3001
CMD [ "npm", "start" ]
