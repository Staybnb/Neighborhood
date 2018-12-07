FROM node:8

WORKDIR /Neighborhood

RUN npm install pm2 -g
COPY package*.json ./

RUN npm install --only=production

# Copy the current directory contents into the container at /app
COPY . .

EXPOSE 3001

CMD ["pm2-runtime", "server/server.js" ]
