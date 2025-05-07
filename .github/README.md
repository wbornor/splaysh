# GitHub Actions Workflows

## DynamoDB to S3 Export Workflow

### Configuration Requirements

#### Repository Variables
Configure the following repository variables in GitHub:
- `AWS_ADMIN_EXPORT_ROLE_ARN`: ARN of the IAM role for DynamoDB export
- `DYNAMODB_TABLE`: Name of the DynamoDB table to export
- `STATIC_DATA_S3_BUCKET`: S3 bucket for storing static JSON files
- `CLOUDFRONT_DISTRIBUTION_ID`: (Optional) CloudFront distribution ID for cache invalidation

#### Repository Secrets
Configure the following secrets:
- `SLACK_WEBHOOK`: (Optional) Slack webhook URL for failure notifications

### Workflow Triggers
- Manual dispatch via GitHub Actions UI
- Scheduled daily run at midnight UTC
- Supports multiple environments (dev, staging, prod)

### Security
- Uses OpenID Connect (OIDC) for AWS authentication
- Minimal IAM role permissions
- Temporary, limited-scope credentials

### Customization
Modify the workflow file to:
- Change scheduling frequency
- Add additional notification channels
- Adjust environment-specific configurations
