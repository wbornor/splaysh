# DynamoDB to S3 Export Docker Setup

## Prerequisites
- Docker
- Docker Compose
- AWS Credentials

## Configuration

### Environment Variables
Create a `.env` file in this directory with the following contents:
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_DEFAULT_REGION=us-west-2
DYNAMODB_TABLE=splaysh-items
S3_BUCKET=splaysh-static-data
ADMIN_ROLE_ARN=arn:aws:iam::YOUR_ACCOUNT_ID:role/SplayshAdminExportRole
```

## Role Assumption
The script uses AWS Security Token Service (STS) to assume an IAM role with specific permissions:
- Read access to DynamoDB table
- Write access to S3 bucket

### Prerequisites
- IAM role created with appropriate permissions
- Role ARN available as an environment variable
- AWS credentials with permission to assume the role

## Running the Export

### Build and Run
```bash
docker-compose up --build
```

### Run without rebuilding
```bash
docker-compose up
```

## Customization
- Modify `Dockerfile` to add additional dependencies
- Update `requirements.txt` for Python package management
- Adjust `docker-compose.yml` for specific deployment needs

## Security Notes
- Never commit `.env` file to version control
- Use AWS IAM roles with minimal necessary permissions
- Consider using AWS Secrets Manager for credential management
