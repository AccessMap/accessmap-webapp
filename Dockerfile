FROM node:8-alpine

RUN apk add --no-cache sqlite-dev yarn

WORKDIR /www/

COPY . /www/

RUN if [ -d node_modules ]; then rm -r node_modules; fi

# Not sure why we have to tell it to install these packages separately, but
# they break if you don't
RUN yarn
