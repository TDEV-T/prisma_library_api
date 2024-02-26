FROM node:lts-alpine


WORKDIR /usr/app

COPY ./package.json .

RUN npm install 

RUN npm i nodemon

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npx prisma migrate 

EXPOSE 5050

CMD ["npm" , "start"]