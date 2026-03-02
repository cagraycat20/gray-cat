#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../stacks/backend/stack';
import { WebUiStack } from '../stacks/web-ui/stack';

const app = new cdk.App();

new BackendStack(app, 'BackendStack');

new WebUiStack(app, 'WebUiStack');
