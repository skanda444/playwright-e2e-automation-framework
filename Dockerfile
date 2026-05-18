FROM mcr.microsoft.com/playwright:v1.59.0-jammy

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p playwright/.auth

ENV CI=true
ENV TEST_ENV=qa

CMD ["npx", "playwright", "test"]