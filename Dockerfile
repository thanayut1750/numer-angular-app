# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /numer/app

#cahce package.json for optimization
COPY package.json package-lock.json ./

# Install all the dependencies
RUN npm install

# Install angular CLI
RUN npm install -g @angular/cli

# Add the source code to app
COPY . .

ENV PATH=/node_modules/.bin:$PATH

# Generate the build of the application
RUN /numer/app/node_modules/.bin/ng build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest


# Copy the build output to replace the default nginx contents.
COPY ./dist/numer-project /usr/share/nginx/html

# Expose port 80
EXPOSE 80
