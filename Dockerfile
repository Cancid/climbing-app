FROM node:12-alpine
WORKDIR /nestjs-climbing-app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
ENV PORT=3000
CMD [ "yarn", "start:dev"]