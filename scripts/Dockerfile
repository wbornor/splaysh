# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY export_dynamodb_to_s3.py .
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables for AWS credentials (these will be passed via docker-compose)
ENV AWS_ACCESS_KEY_ID=""
ENV AWS_SECRET_ACCESS_KEY=""
ENV AWS_DEFAULT_REGION="us-west-2"

# Set default environment variables for the script
ENV DYNAMODB_TABLE="splaysh-items"
ENV S3_BUCKET="splaysh-static-data"

# Run the script when the container launches
CMD ["python", "export_dynamodb_to_s3.py"]
