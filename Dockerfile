FROM node:13-alpine

# ENV MONGO_DB_USERNAME=admin \
#     MONGO_DB_PWD=password

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json .

#corre en la imagen
RUN npm install

#corre en el host
COPY . .

CMD ["npm","run","dev"]
