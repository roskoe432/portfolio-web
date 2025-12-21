FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_ENV
ARG VITE_GITHUB_URL
ARG VITE_LINKEDIN_URL
ARG VITE_PERLENSPIEL_URL

ENV VITE_ENV=$VITE_ENV
ENV VITE_GITHUB_URL=$VITE_GITHUB_URL
ENV VITE_LINKEDIN_URL=$VITE_LINKEDIN_URL
ENV VITE_PERLENSPIEL_URL=$VITE_PERLENSPIEL_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]