import reducer, {initialState} from '../reducers';
import {createStore} from "redux";

const store = createStore(reducer, initialState);

export default store;
