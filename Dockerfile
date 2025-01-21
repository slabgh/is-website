FROM node:21-alpine as build

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["npm", "start"]
