import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";

import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from 'redux'

import rootReducer from './storage/index'

import App from './App'



const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
