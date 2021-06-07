FROM node:14-alpine
RUN yarn
CMD ["yarn", "build"]
CMD ["yarn", "start"]
