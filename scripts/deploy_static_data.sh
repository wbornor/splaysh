#!/bin/bash

# Exit on any error
set -e

# Configuration
DYNAMODB_TABLE="splaysh-items"
S3_BUCKET="splaysh-static-data"
PYTHON_SCRIPT_PATH="./scripts/export_dynamodb_to_s3.py"

# Ensure required tools are installed
command -v aws >/dev/null 2>&1 || { echo >&2 "AWS CLI is required but not installed.  Aborting."; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo >&2 "Python 3 is required but not installed.  Aborting."; exit 1; }

# Activate virtual environment if exists (optional)
if [ -d "./venv" ]; then
    source ./venv/bin/activate
fi

# Install dependencies
pip install boto3 awscli

# Run the export script
python3 "$PYTHON_SCRIPT_PATH"

# Optional: Invalidate CloudFront cache if using CloudFront
# aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/data/posts/*"

echo "Static data export completed successfully."
