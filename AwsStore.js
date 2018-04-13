import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import AWSAppSyncClient from "aws-appsync";
import AppSync from "./AppSync.js";
import { graphql, ApolloProvider, compose } from "react-apollo";
import * as AWS from "aws-sdk";
const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,
    apiKey: AppSync.apiKey
  }
});
export default client;