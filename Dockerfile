## BUILDER
# Setup
FROM node:8-alpine as builder
WORKDIR /usr/src/app

# Copy 
COPY package*.json ./

RUN npm install
RUN npm run build


## APP
# Setup
FROM node:8-alpine
WORKDIR /usr/src/app

# Create environment
COPY .env ./
RUN source .env

# Copy app files
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/out ./out

# Networking
EXPOSE 8888

# Start
CMD [ "npm", "start" ]
