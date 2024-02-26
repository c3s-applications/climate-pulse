# PREPARE STAGE
FROM node:16 AS prepare

ARG environment

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY scripts/ /app/scripts
COPY package*.json craco.config.js /app/
COPY environments/.env.${environment} /app/.env

RUN npm install

FROM prepare AS development

EXPOSE 3000
CMD ["npm", "start"]

FROM prepare AS build
RUN npm run build

RUN apt-get update
RUN apt-get install -y cron wget
RUN crontab /app/scripts/status-cron

FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html/
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/STAR.* /etc/nginx/
COPY nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
