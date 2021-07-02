# build
FROM node:latest as build
WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

# run
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/sample-mfe-stencil /usr/share/nginx/html

EXPOSE 80
