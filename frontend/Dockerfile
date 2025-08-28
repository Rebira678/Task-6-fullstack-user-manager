FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["npx","serve","-s","dist","-l","5173"]
