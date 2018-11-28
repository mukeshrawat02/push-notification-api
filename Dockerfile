FROM node:8

WORKDIR /app
COPY . /app/
# Install app dependencies

RUN npm install && npm run build

CMD [ "npm", "start" ]
