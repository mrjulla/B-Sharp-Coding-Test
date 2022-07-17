FROM node:17

WORKDIR /app
COPY . /app
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]