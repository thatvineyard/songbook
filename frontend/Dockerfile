#--------------------------------------------------------------#
## BUILDER
#--------------------------------------------------------------#
# Setup
FROM node:8-alpine as builder
WORKDIR /usr/src/app

# Install NPM 
COPY package*.json ./
RUN npm install

# Create environment
# COPY .dockerenv ./
#SHELL ["/bin/sh", "-c", ". ./.dockerenv"]
# ENV CONTEXT_ROOT /songbook/app

# Build app
COPY . .
RUN  npm run build

#--------------------------------------------------------------#
## APP
#--------------------------------------------------------------#
# Setup
FROM nginx
WORKDIR /app

# Create environment - doesn't work on this image, use nginx.conf to set port
#COPY .dockerenv ./
#RUN source .dockerenv

# Copy app files
COPY --from=builder /usr/src/app/dist .
COPY nginx.conf /etc/nginx/nginx.conf

# Networking
EXPOSE 80

# Start
#CMD [ "npm", "start" ]
