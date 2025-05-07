# Deployment Workflow

## Overview
This GitHub Actions workflow automates the deployment of the Splaysh web application.

## Workflow Triggers
- Manual dispatch via GitHub Actions UI
- Automatic deployment on push to `main` and `develop` branches

## Environment Configuration

### Required Repository Variables
- `AWS_DEPLOYMENT_ROLE_ARN`: IAM role for AWS deployment
- `CONFIG_S3_BUCKET`: S3 bucket containing configuration files
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution for cache invalidation

### Required Repository Secrets
- `SLACK_WEBHOOK`: Slack webhook URL for deployment notifications

## Deployment Workflow Steps
1. Checkout repository
2. Set up Node.js
3. Configure AWS credentials
4. Validate CloudFormation template
5. Deploy/Update CloudFormation stack
6. Fetch configuration
7. Install dependencies
8. Build web application
9. Deploy web artifacts
10. Invalidate CloudFront cache
11. Send Slack notifications

## Environment Determination
- `prod`: Triggered by pushes to `main` branch
- `dev`: Triggered by pushes to `develop` branch or manual selection

## Security
- Uses OpenID Connect (OIDC) for AWS authentication
- Minimal IAM role permissions
- Temporary, limited-scope credentials
