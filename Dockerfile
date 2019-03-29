# BUILDER
FROM node:8-alpine as builder

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build


# APP
FROM node:8-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/out ./out

EXPOSE 8080

CMD [ "npm", "start" ]
