FROM ubuntu:16.04

RUN apt-get update && \
      apt-get install -y \
        curl \
        docker

RUN echo "deb http://deb.nodesource.com/node_6.x xenial main" > /etc/apt/sources.list.d/nodesource.list
RUN echo "deb-src http://deb.nodesource.com/node_6.x xenial main" >> /etc/apt/sources.list.d/nodesource.list
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

RUN apt-get update && \
      apt-get install -y \
        nodejs \
        libsqlite3-dev

RUN npm install -g yarn

WORKDIR /www/

COPY . /www/

RUN if [ -d node_modules ]; then rm -r node_modules; fi

# Not sure why we have to tell it to install these packages separately, but
# they break if you don't
# RUN yarn add sqlite3 mapnik
RUN yarn
