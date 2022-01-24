FROM node:14
WORKDIR /nestjs-climbing-app
COPY package*.json ./
RUN npm install
COPY . .
ENV DB_HOST='localhost' \
DB_PORT=5432 \
DB_USERNAME='postgres' \
DB_PASSWORD='postgres' \
DB_DATABASE='climbing-app' \
REFRESH_TOKEN_SECRET='secret' \
REFRESH_TOKEN_EXPIRATION='40000' 
EXPOSE 5432
CMD [ "yarn", "start:dev"]