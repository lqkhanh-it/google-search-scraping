# Build BASE
FROM node:20-alpine as BASE

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:20-alpine AS BUILD

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git curl \
    && npx prisma generate \
    && yarn build \
    && cd .next/standalone \
    && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
    && npx node-prune

# Build production
FROM node:20-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/package.json /app/yarn.lock ./
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/next.config.mjs ./
COPY --from=BUILD /app/.next ./.next
COPY --from=BUILD /app/public ./public
COPY --from=BUILD --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=BUILD --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]