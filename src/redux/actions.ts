export const DAUM_SEARCH_REQUEST = "DAUM_SEARCH_REQUEST";
export const DAUM_SEARCH_SUCCESS = "DAUM_SEARCH_SUCCESS";
export const DAUM_SEARCH_FAILURE = "DAUM_SEARCH_FAILURE";

export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const DELETE_BOOKMARK = "DELETE_BOOKMARK";

const searchRequest = () => ({
  type: DAUM_SEARCH_REQUEST,
});

const searchSuccess = (
  result: SearchResult,
  keyword: string,
  page: number
) => ({
  type: DAUM_SEARCH_SUCCESS,
  result,
  keyword,
  page,
});

const searchFailure = (error: any) => ({
  type: DAUM_SEARCH_FAILURE,
  error,
});

export const addBookmark = (blogUrl: string) => ({
  type: ADD_BOOKMARK,
  blogUrl,
});

export const deleteBookmark = (index: number, blogUrl: string) => ({
  type: DELETE_BOOKMARK,
  index,
  blogUrl,
});

export const fetchSearch = (keyword: string, page: number) => async (
  dispatch: any
) => {
  const restApiKey = process.env.REACT_APP_API_KEY;
  const query = `?query=${keyword}&page=${page}`;

  dispatch(searchRequest());

  try {
    const res = await fetch(`https://dapi.kakao.com/v2/search/blog${query}`, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    });

    if (res.status !== 200) {
      throw new Error();
    }

    const searchResult = await res.json();
    dispatch(searchSuccess(searchResult, keyword, page));
  } catch (error) {
    // dispatch(searchFailure(error));
  }
};
