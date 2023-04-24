import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";  // para poder realizar operaciones asincronas con redux.

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // thunkMiddleware es el que puede hacer la request
);

export default store;
