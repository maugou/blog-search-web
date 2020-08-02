// import { combineReducers } from "redux";
import {
  // DAUM_SEARCH_REQUEST,
  DAUM_SEARCH_SUCCESS,
  // DAUM_SEARCH_FAILURE,
} from "./actions";

export const getSearchResult = (
  state = {},
  action: { type: string; result?: { meta: {}; documents: [] }; error: {} }
) => {
  switch (action.type) {
    // case DAUM_SEARCH_REQUEST:
    //   return;
    case DAUM_SEARCH_SUCCESS:
      return { ...state, searchResult: action.result };
    // case DAUM_SEARCH_FAILURE:
    //   return {};
    default:
      return state;
  }
};

// export default combineReducers({
//   result: searchResult,
// });
