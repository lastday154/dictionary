# Serverless REST API

This example demonstrates how to setup a [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create and get defintions of word. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the dictonary operations. For each operation exactly one file exists e.g. `models/dictionary/get.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
```

## Run local

```bash
npm start
```

## Run test

```bash
npm test
```

## Deploy

In order to deploy the endpoint simply run

```bash
npm run deploy
```
The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished...
Service Information
service: dictionary
stage: dev
region: us-east-1
stack: dictionary-dev
api keys:
  None
endpoints:
  GET - https://ez45bw2m32.execute-api.us-east-1.amazonaws.com/dev/dictionary
  GET - https://ez45bw2m32.execute-api.us-east-1.amazonaws.com/dev/definition
functions:
  createDictionary: dictionary-dev-createDictionary
  getDictionary: dictionary-dev-getDictionary
Serverless: Removing old service versions...
```

## Usage

You can insert batch or get definitions of word with the following commands:

### Create a Dictionary

```bash
curl  https://ez45bw2m32.execute-api.us-east-1.amazonaws.com/dev/dictionary
```

Example Result:

```bash
[{"id":"9e925e9341b490bfd3b4c4ca3b0c1ef2","word":"this","definition":"As a demonstrative pronoun, this denotes something that is present or near in place or time, or something just mentioned, or that is just about to be mentioned."}]
```

### Get defintion

```bash
# Replace the <word> part with a real word from your dictionary table
curl  https://ez45bw2m32.execute-api.us-east-1.amazonaws.com/dev/definition?word=<word>
```

Example Result:

```bash
{"id":"9e925e9341b490bfd3b4c4ca3b0c1ef2","definition":"As a demonstrative pronoun, this denotes something that is present or near in place or time, or something just mentioned, or that is just about to be mentioned.","word":"this"}%
```
