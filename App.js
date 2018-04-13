import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Root } from "native-base";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./src/reducers/index";
import RootStack from "./src/config/routing";
import { Crashlytics } from "react-native-fabric"; //Get Crashlytics component
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { graphql, ApolloProvider, compose } from "react-apollo";
import * as AWS from "aws-sdk";
import AppSync from "./AppSync.js";
import client from './AwsStore';
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import UserLocator from "./src/components/UserLocator";

export default class App extends React.Component {
  componentDidMount() {
    //Sets user details
    //Crashlytics.setUserName("megaman");
    //Crashlytics.setUserEmail("user@email.com");
    //Crashlytics.setUserIdentifier("1234");
    console.disableYellowBox = true
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Rehydrated>
              <Root>
                <RootStack screenProps={store} />
                <UserLocator />
              </Root>
            </Rehydrated>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
