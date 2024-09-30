FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "tsconfig.build.json", "./"]

RUN npm install -g @nestjs/cli@10

RUN npm install --production --silent && mv node_modules ../

RUN npm run build

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "run","start:prod"]
