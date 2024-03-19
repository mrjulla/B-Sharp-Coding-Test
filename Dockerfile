FROM node:20.11.1

WORKDIR /app
COPY . /app
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]