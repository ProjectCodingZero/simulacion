FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN chown -R node:node /app

USER node

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080"]
