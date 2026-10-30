FROM node:24-alpine

WORKDIR /frontend

COPY nebiral-frontend/package*.json ./

RUN npm ci

COPY ./nebiral-frontend/ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]