FROM node:24

WORKDIR /frontend

RUN apt-get update && apt-get install -y --no-install-recommends \
    certbot \
    curl \
    wget \
    nginx \
    openssl \
    dnsutils \
    iputils-ping \
    iproute2 \
    net-tools \
    netcat-openbsd \
    procps \
    htop \
    nano \
    vim \
    git \
    jq \
    unzip \
    zip \
    tcpdump \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY nebiral-frontend/package*.json ./

RUN npm ci

COPY ./nebiral-frontend/ ./

RUN npm run build

ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]