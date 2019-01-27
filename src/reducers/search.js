import { SEARCH_NAME, COUNT_SEARCH, CLEAR_SEARCH } from "../constants/search";

const initialState = {};
const searchReducer = function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_NAME:
      return { action: SEARCH_NAME, name: action.name };
    case COUNT_SEARCH:
      return { action: COUNT_SEARCH, count: action.count };
    case CLEAR_SEARCH:
      return { action: CLEAR_SEARCH };
    default:
      return { action: "", data: initialState };
  }
  return state;
};
export default searchReducer;
