import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import AuthReducer from "./Reducer/AuthReducer";

const rootReducer = combineReducers({
    Auth: AuthReducer
});

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));
export default Store;