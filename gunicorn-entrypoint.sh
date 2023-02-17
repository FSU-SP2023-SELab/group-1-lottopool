#!/bin/bash

# Make sure token is set
if [ -z ${DOPPLER_TOKEN+x} ]; then
    echo "ERROR: Doppler token is unset!"
    exit -1
fi

# Run gunicorn with doppler secret injection
echo "Starting Gunicorn with Doppler..."
doppler run --preserve-env -- gunicorn \
    --workers=4 \
    --bind=0.0.0.0:3001 \
    wsgi:app
