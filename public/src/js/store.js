/**
 * Created by zmz0305 on 11/7/16.
 */
import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer, middleware);