FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


FROM node:22-alpine AS development

WORKDIR /app

ENV NODE_ENV=development

RUN chown node:node /app

USER node

COPY --chown=node:node package*.json .

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]


FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json .

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

USER node

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run:prod && node dist/main.js"]
