ARG nodeVersion=lts
ARG nodeOptions=""
ARG appPath="."

FROM node:${nodeVersion}-alpine as builder

ARG appPath
ENV HOME=/app
# Set working directory
WORKDIR ${HOME}
# Copy all files from current directory to working dir in image
COPY . .
ENV NODE_OPTIONS=${nodeOptions}

WORKDIR ${HOME}
RUN chown node:node ${HOME} && chown node:node ${HOME}/
# install node modules and build assets
RUN yarn && yarn build && yarn generate


# nginx state for serving content
FROM nginx:alpine
ENV NODE_ENV=production
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
