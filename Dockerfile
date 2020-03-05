FROM node:10.19.0-alpine

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
# create destination directory
RUN mkdir -p /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# update and install dependency
RUN apk update && apk upgrade

COPY . /usr/share/nginx/html

# build necessary, even if no static files are needed,
# since it builds the server as well
# copy the app, note .dockerignore
RUN npm install && npm run build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "npm", "start" ]

