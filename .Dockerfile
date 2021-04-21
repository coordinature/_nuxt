FROM node:10.16.0-alpine

# Create app directory
WORKDIR /
ADD . /app/

# Install app dependencies
RUN apk update && apk upgrade && apk add git
RUN yarn install

# Build app
RUN yarn generate

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "start"]