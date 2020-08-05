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
  keyword: string;
  page: number;
}

const searchInfo = (state = {}, action: Action) => {
  switch (action.type) {
    case DAUM_SEARCH_REQUEST:
      return { ...state, isFetching: true };

    case DAUM_SEARCH_SUCCESS:
      const { documents, ...meta } = action.result;
      const docUrl = documents.map((blog: { url: string }) => blog.url);

      return {
        ...state,
        ...meta,
        docUrl,
        keyword: action.keyword,
        pageNumber: action.page,
        isFetching: false,
      };

    case DAUM_SEARCH_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

const bookmark = (state = [], action: Action) => {
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

const documents = (state: NewDocuments = {}, action: Action) => {
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
  searchInfo,
  bookmark,
  documents,
});
