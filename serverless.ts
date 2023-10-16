import type {AWS} from '@serverless/typescript';

import {functions} from "@functions/index";

const STAGE = "dev"
const serverlessConfiguration: AWS = {
    service: 'come-get-it-api',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline'],
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        stage: STAGE,
        timeout: 29,
        logs: {
            restApi: {
                level: "ERROR"
            }
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: "Allow",
                        Action: "states:StartExecution",
                        Resource: [
                            '*'
                        ]
                    }
                ]
            }
        },
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
            binaryMediaTypes: [],
        },
        environment: {
            STAGE: STAGE,
        },
    },
    functions: functions,
    package: {individually: true},
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node18',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
    }
};

module.exports = serverlessConfiguration;