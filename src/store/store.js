import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers/combinedReducers";

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);


export { store };
