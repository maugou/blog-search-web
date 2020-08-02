export const DAUM_SEARCH_REQUEST = "DAUM_SEARCH_REQUEST";
export const DAUM_SEARCH_SUCCESS = "DAUM_SEARCH_SUCCESS";
export const DAUM_SEARCH_FAILURE = "DAUM_SEARCH_FAILURE";

// const searchRequest = () => ({
//   type: DAUM_SEARCH_REQUEST,
// });

const searchSuccess = (result: SearchResult) => ({
  type: DAUM_SEARCH_SUCCESS,
  result,
});

const searchFailure = (error: any) => ({
  type: DAUM_SEARCH_FAILURE,
  error,
});

export const fetchSearch = (keyword: string) => async (dispatch: any) => {
  const restApiKey = process.env.REACT_APP_API_KEY;
  const query = `?query=${keyword}`;

  // dispatch(searchRequest());
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

    const result = await res.json();
    dispatch(searchSuccess(result));
  } catch (error) {
    dispatch(searchFailure(error));
  }
};
