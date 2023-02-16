FROM --platform=linux/amd64 node:lts-stretch

WORKDIR /usr/node-app

# Create application directories
RUN mkdir client

WORKDIR /usr/node-app/client

# Copy server app to container
COPY . .

# Install app dependencies
RUN npm install

# Build app
RUN npm run build

CMD ["node", "dist/server/entry.mjs" ]
