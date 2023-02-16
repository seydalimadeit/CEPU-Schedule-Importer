FROM --platform=linux/amd64 node:lts-stretch

WORKDIR /usr/node-app

# Create application directories
RUN mkdir server

WORKDIR /usr/node-app/server

# Copy server app to container
COPY . .

# Install app dependencies
RUN npm install --legacy-peer-deps

# Build app
RUN npm run build

CMD ["node", "dist/main.js" ]
