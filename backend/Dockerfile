#
# group-1-lottopool Dockerfile.backend
# (c) 2023 FSU-SP2023-SELab group1
#

# Source Python's 3.10 Debian Buster image
FROM python:3.10-slim

# Set Labels
LABEL org.opencontainers.image.authors="me@azureagst.dev"
LABEL org.opencontainers.image.source="https://github.com/FSU-SP2023-SELab/group-1-lottopool"

# Set working dir
WORKDIR /usr/src/app

# Install Doppler CLI
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | apt-key add - && \
    echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && \
    apt-get -y install doppler

# Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn runtime
RUN pip install gunicorn

# Copy in the rest of the app
COPY . .

# Set default env vars
ENV DOCKER_ENV=True

# Set entrypoint
CMD [ "./entrypoint.sh" ]
