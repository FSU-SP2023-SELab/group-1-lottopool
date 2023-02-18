#
# group-1-lottopool Dockerfile.backend
# (c) 2023 FSU-SP2023-SELab group1
#

#
# Stage 1 - Build the app
#

# Source Node's 19 image
FROM node:19 AS builder

# Set working dir
WORKDIR /usr/src/app

# Install Node requirements
COPY package.json package-lock.json ./
RUN npm install

# Copy everything else over
COPY . .

# Build
RUN npm run build

#
# Stage 2 - Serve app via NGINX
#

FROM nginx:1.23.3 AS server

# Set Labels
LABEL org.opencontainers.image.authors="me@azureagst.dev"
LABEL org.opencontainers.image.source="https://github.com/FSU-SP2023-SELab/group-1-lottopool"

# Set working dir
WORKDIR /usr/src

# Copy in NGINX configuration & entrypoint
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copy in compiled frontend from builder
COPY --from=builder /usr/src/app/dist ./app
