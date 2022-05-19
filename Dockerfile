# Use official node image as the base image
FROM node:latest AS FrontEndDevelopment

# Set the working directory
WORKDIR /numerapp/frontend/src/app

COPY package*.json ./

RUN npm install -g @angular/cli@10.0.4 && \
    npm install

COPY . .

EXPOSE 4200 49153

CMD [ "npm", "start" ]

