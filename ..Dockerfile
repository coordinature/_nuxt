FROM node:10.16.0-alpine

# Create app directory
WORKDIR /
ADD . .

# Install app dependencies
RUN apk update && apk upgrade && apk add git
RUN yarn install

# Build app
RUN yarn generate

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "start"]


#FROM nginx
#COPY . /usr/share/nginx/html

# set the argument default
# ARG NODE_ENV=production

# assign it to an environment variable
# we can wrap the variable in brackets
# ENV NODE_ENV ${NODE_ENV}

# or omit them completely

# use the argument
# RUN echo $NODE_ENV