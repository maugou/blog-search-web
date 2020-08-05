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
  error: boolean;
}

const infoInitialState = {
  docUrl: [],
  meta: {},
  pageNumber: 1,
  keyword: "",
  isFetching: false,
  error: false,
};

const searchInfo = (state = infoInitialState, action: Action) => {
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
        error: false,
      };

    case DAUM_SEARCH_FAILURE:
      return {
        ...infoInitialState,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

const bookmark = (state = [], action: Action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, action.blogUrl];

    case DELETE_BOOKMARK:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];

    default:
      return state;
  }
};

const documents = (state: any = {}, action: Action) => {
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

    default:
      return state;
  }
};

export default combineReducers({
  searchInfo,
  bookmark,
  documents,
});
