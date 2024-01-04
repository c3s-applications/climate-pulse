# PREPARE STAGE
FROM node:16 AS prepare

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

FROM prepare AS development

EXPOSE 3000
CMD ["npm", "start"]

FROM prepare AS build
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html/c3s-apps/climate-pulse/
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
