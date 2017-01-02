#!/bin/bash
set -xe

export GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`;

export ENV=$GIT_BRANCH;
export AWS_CLI_PROFILE="personal";
export CFN="cfn.yaml";
export CFN_PARAM_JSON="cfn-param-$ENV.json";
export APP_NAME="splayshweb";
export STACK_NAME="$APP_NAME-$ENV";
export NOW=`date +%y%m%d%H%M%S`;
export CONFIGS="splaysh-private-artifacts/splayshweb-config";

if [ "$ENV" = "prd" ]; then
  SITEDOMAIN="splaysh.com";
  NODE_ENV="production";
  CONFIGS="$CONFIGS/prd/config.js";
else
  SITEDOMAIN="dev.splaysh.com";
  NODE_ENV="development";
  CONFIGS="$CONFIGS/dev/config.js";
fi

aws cloudformation validate-template \
--profile $AWS_CLI_PROFILE \
--template-body file://$CFN

aws cloudformation create-stack --profile $AWS_CLI_PROFILE \
--stack-name $STACK_NAME \
--template-body file://$CFN \
--parameters file://$CFN_PARAM_JSON \
--tags Key=app,Value=$APP_NAME Key=env,Value=$ENV \
--capabilities CAPABILITY_IAM \
|| \
aws cloudformation update-stack --profile $AWS_CLI_PROFILE \
--stack-name $STACK_NAME \
--template-body file://$CFN \
--parameters file://$CFN_PARAM_JSON \
--capabilities CAPABILITY_IAM \
|| \
true

aws s3 --profile $AWS_CLI_PROFILE cp s3://$CONFIGS ./web/js/config.js

npm install
npm run webpack

aws s3 --profile $AWS_CLI_PROFILE cp index.html s3://$SITEDOMAIN/
aws s3 --profile $AWS_CLI_PROFILE cp dist/bundle.js s3://$SITEDOMAIN/dist/