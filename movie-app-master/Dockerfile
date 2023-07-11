FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV REACT_APP_GRAPHQL_URL=host.docker.internal:3100/graphql
ENV REACT_APP_PORT_3001_URL=host.docker.internal:3001/auth/login

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
