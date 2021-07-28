import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import example from "./example";
// import user from './user'; // 리듀서
// middleware
import thunk from "redux-thunk";
import logger from "redux-logger";
// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  example,
  router: connectRouter(history),
});

//init middleware
const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;
if (env === "development") {
  middlewares.push(logger);
}

//redux devTools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = initialStore => createStore(rootReducer, enhancer);
export default store();
