FROM node:16-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json .

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
