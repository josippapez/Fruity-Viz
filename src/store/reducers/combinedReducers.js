import { combineReducers } from "redux";

import fruits from "./rootReducer";

const reducers = combineReducers({
    fruits,
})

export default reducers;