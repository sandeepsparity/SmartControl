import React, { Component } from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'sb',
    storage
}
const persistedReducer = persistReducer(persistConfig, allReducers)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
