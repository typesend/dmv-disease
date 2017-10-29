FROM node:8

# Install application.
COPY . /app
WORKDIR /app
RUN yarn install

CMD ["yarn", "start"]
