FROM node:10.16.0-alpine

# Create app directory
RUN mkdir -p /usr/src/dashboard
WORKDIR /usr/src/dashboard

# Install app dependencies
RUN apk update && apk upgrade && apk add git

ONBUILD COPY . /usr/src/app/dashboard
ONBUILD RUN npm install

# Build app
ONBUILD RUN npm run generate

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "start"]