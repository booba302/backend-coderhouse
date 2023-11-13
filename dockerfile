FROM node

WORKDIR /app-api-great-henge

COPY package*.json ./

RUN npm install

COPY . .



#EXPOSE 9999
EXPOSE 8888

#CMD ["npm","start"]
CMD ["npm","run","dev"]