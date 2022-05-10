# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app
COPY / ./
COPY package*.json ./

RUN npm install -g @angular/cli@10.0.4 && \
    npm install && \
    ng build
COPY . .




# Stage 2: Serve app with nginx server


FROM nginx:latest

COPY --from=build /app/dist/numer-project /usr/share/nginx/html

EXPOSE 80

