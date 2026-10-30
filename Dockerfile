FROM node:24-alpine

WORKDIR /frontend

COPY nebiral-frontend/package*.json ./

RUN npm ci

COPY ./nebiral-frontend/ ./

RUN npm run build

COPY nginx/nginx.conf /etc/nginx/nginx.conf

ENV HOSTNAME=0.0.0.0

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]