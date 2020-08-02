import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getSearchResult } from "./reducers";

export const store = createStore(getSearchResult, applyMiddleware(thunk));
