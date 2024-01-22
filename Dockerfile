FROM --platform=linux/amd64 amazonlinux:2023
RUN dnf check-update
RUN dnf update
RUN dnf install -y \
    git \
    nodejs \
    openssh \
    tar \
    wget \
    gzip \ 
    npm

ENV NODE_ENV production
WORKDIR /app
COPY . /app/
# COPY ./node_modules /app/node_modules 
COPY ./.next/standalone .
COPY ./.next/static /app/.next/static
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm ci

RUN npm run build

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]