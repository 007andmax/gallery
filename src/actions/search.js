
import {SEARCH_NAME,COUNT_SEARCH,CLEAR_SEARCH} from "../constants/search";

export function SearchByName(name) {
    return { type: SEARCH_NAME, name:name};
}

export function setCountSearchItem(count) {
    return { type: COUNT_SEARCH, count:count};
}

export function clearSerch() {
    return { type: CLEAR_SEARCH};
}