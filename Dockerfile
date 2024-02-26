FROM node:lts-alpine


WORKDIR /usr/app

COPY ./package.json .

RUN npm install 

COPY . .

RUN npx prisma migrate 

CMD ["npm" , "start"]