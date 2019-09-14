# Serverless Azure Demo

This project shows an easy example on how to create a Serverless REST API that uses the Serverless Azure plugin.

## Pre-requisites

1. Node.js `v8.5.0` or later.
1. Serverless CLI `v1.9.0` or later. You can run `npm install -g serverless` to install it.
1. An Azure account *(For Deployment)*

## Setup

Clone the repository
```bash
git clone https://github.com/wbreza/serverless-azure-demo.git
```

### Navigate to directory
```
cd serverless-azure-demo
```

### Install Dependencies
```bash
npm ci
```

### Run Locally
```bash
npm start
```

### Deploying to Azure
To deploy to Azure you will need an Azure account and have your credentials configured correctly. See the [quick start](https://serverless.com/framework/docs/providers/azure/guide/quick-start/) for more information.
```bash
npm run deploy
```