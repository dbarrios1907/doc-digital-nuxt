# Doc-Digital-Nuxt

## Run on your local env

### First create the local domain required for claveunica redirect authentication

- Install nginx if not installed on your PC, otherwise skip this step
```
brew install nginx
```

- Run command or Access to /etc/hosts file and manually insert the bellow described domain
```
echo "127.0.0.1 doc.digital.io" >> /etc/hosts
```

- Copy local nginx config to nginx default configuration directory. Usually if you have installed nginx with brew the directory will be **/usr/local/etc/nginx**
Make sure you have the correct install directory and verify on the configuration the folder from which nginx import additional servers
Check the IMPORTANT NOTE comment on the bellow nginx sample to identify the proper location of which you need to add your config
``
http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  logs/access.log  main;
    sendfile        on;
    # Need to increase buffer size for order confirmation
    proxy_buffer_size            128k;
    proxy_buffers                4 256k;
    proxy_busy_buffers_size      256k;
    client_max_body_size         10M;
    # Need to increase server names hash bucket size for longer server names
    server_names_hash_bucket_size   128;

    tcp_nopush     on;
    gzip  on;
    
    # IMPORTANT NOTE  
    # include additional virtualhost from location
    include servers/*;  
}
``

#### Above sample is taken from MacOs nginx installation with brew

```
cp docker/local.conf /usr/local/etc/nginx/servers/doc-digital.conf
```

- Start & Stop nginx to refresh config
Run nginx to apply previously introduced changes to
```
sudo nginx
```

### Additional commands from nginx

Restart nginx if already running
```
sudo nginx -s reload
```

Stop nginx to disable reverse proxy redirections
```
sudo nginx -s stop
```

- Run App on development mode
Navigate to project root and Run
```
yarn dev
```
or

if yarn is not installed
```
npm run dev
```

- Now App should be available to use by accessing [https://dov.digital.io](https://dov.digital.io)


## Run production config using docker on your local env
- Navigate to project root
- Use docker to build and run production env on local setup. Make sure you have docker installed on your PC
```
docker-compose up
```
Above command should build and run your app with production profile over the same port as development.
Meaning that you will use same nginx config as previously configured for development mode to run production env over docker.
App should be accessible through [https://dov.digital.io](https://dov.digital.io) if your nginx server is running.

**Important**
Only one server should be running at the same time as both development and production mode use same redirection port and nginx configuration


## Build & Deploy docker file instead of using docker compose
This will allow you to have a persisted container for your app.

## DockerBuild

Docker image Args defaults:

- ARG nodeVersion=lts
- ARG nodeOptions=""
- ARG appPath="."

Navigate to project root

**Important** you can change the bellow described name as preference (docdigitalv3-front:1.0.0)
```
docker build -t docdigitalv3-front:1.0.0 .
```
```
docker run --rm -it -p 8080:80 docdigitalv3-front:1.0.0
```

## Pre production URL (DEMO)
[https://docv3.test.digital.gob.cl/](Demo)


## Basic npm script to RUN and BUILD the project

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
