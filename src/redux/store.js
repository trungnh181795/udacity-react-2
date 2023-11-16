import { legacy_createStore } from "redux";
import reducers from "./reducers";
import middleware from "./middleware";

export const store = legacy_createStore(reducers, middleware)