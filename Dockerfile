FROM node:14-alpine
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY package.json /usr/src/bot
RUN yarn
COPY . /usr/src/bot
CMD ["yarn", "build"]
CMD ["yarn", "start"]