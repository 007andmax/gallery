/**
 * Created by Макс on 29.10.2017.
 */
import { combineReducers } from "redux";
import gallery from "./gallery";
import search from "./search";
import { routerReducer } from "react-router-redux";
var reducers = combineReducers({
    galleryState: gallery,
    searchState: search,
    routing: routerReducer,
});

export default reducers;
