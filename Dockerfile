FROM node:18.12.0 as developer
WORKDIR /app
COPY docker/entrypoint.sh /
RUN npm install -g @vue/cli-service @vue/cli
ENTRYPOINT ["/entrypoint.sh"]
