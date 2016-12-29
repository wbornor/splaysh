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
--capabilities CAPABILITY_IAM
