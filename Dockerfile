FROM node:18
WORKDIR /usr/src/green-pie-api
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 5050
CMD npm start