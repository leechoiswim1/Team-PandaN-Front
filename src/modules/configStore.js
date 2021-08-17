import { createStore, combineReducers, applyMiddleware, compose } from "redux";
/* == Redux - middleware */
import thunk from "redux-thunk";
import logger from "redux-logger";
/* == Redux - router */
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
/* == Redux - reducer */
import project from "./project";
import note from "./note";
import user from "./user";
import comment from "./comment";
import search from "./search";

export const history = createBrowserHistory();
/* == Main - Root reducer */
const rootReducer = combineReducers({
  project,
  note,
  user,
  comment,
  search,
  router: connectRouter(history),
});

/* == initialize middlewares */
const middlewares = [thunk.withExtraArgument({ history: history })];

/* == set up logger & redux dev tools */
const env = process.env.NODE_ENV;
if (env === "development") {
  middlewares.push(logger);
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);
export default store();
