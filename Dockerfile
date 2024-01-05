# PREPARE STAGE
FROM node:16 AS prepare

ARG environment

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package*.json craco.config.js /app/
COPY environments /app/environments

RUN npm install

FROM prepare AS development

EXPOSE 3000
CMD ["npm", "start"]

FROM prepare AS build
ARG environment
RUN npm run build:${environment}

FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html/
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
