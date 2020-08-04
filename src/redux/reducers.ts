import { combineReducers } from "redux";

import {
  DAUM_SEARCH_REQUEST,
  DAUM_SEARCH_SUCCESS,
  DAUM_SEARCH_FAILURE,
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
} from "./actions";

interface Action {
  type: string;
  result: SearchResult;
  blogUrl: string;
  index: number;
}

const getSearchResult = (state = {}, action: Action) => {
  switch (action.type) {
    case DAUM_SEARCH_REQUEST:
      return { ...state, isFetching: true };

    case DAUM_SEARCH_SUCCESS:
      const { documents, ...meta } = action.result;
      return { ...state, meta, isFetching: false };

    case DAUM_SEARCH_FAILURE:
      return { ...state, meta, isFetching: false };

    default:
      return state;
  }
};

const getBookmark = (state = [], action: Action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, action.blogUrl];

    case DELETE_BOOKMARK:
      let bookmark = [...state];
      bookmark.splice(action.index, 1);
      return bookmark;

    default:
      return state;
  }
};

const setDocuments = (state: NewDocuments = {}, action: Action) => {
  switch (action.type) {
    case DAUM_SEARCH_SUCCESS:
      let documents = {};
      for (let blog of action.result.documents) {
        documents = {
          ...documents,
          [blog.url]: { ...blog },
        };
      }
      return { ...state, ...documents };

    case ADD_BOOKMARK:
    case DELETE_BOOKMARK:
      return {
        ...state,
        [action.blogUrl]: {
          ...state[action.blogUrl],
          isBookmark: !state[action.blogUrl].isBookmark,
        },
      };

    default:
      return state;
  }
};

export default combineReducers({
  searchResult: getSearchResult,
  bookmark: getBookmark,
  documents: setDocuments,
});
