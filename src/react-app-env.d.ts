/// <reference types="react-scripts" />

interface SearchResult {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: [
    {
      title: string;
      contents: string;
      url: string;
      blogname: string;
      thumbnail: string;
      datetime: string;
    }
  ];
}

interface Store {
  searchInfo: {
    isFetching: boolean;
    meta: {
      total_count: number;
      pageable_count: number;
      is_end: boolean;
    };
    docUrl: [];
    keyword: string;
    pageNumber: number;
    error: boolean;
  };
  bookmark: [];
  documents: {
    [key: string]: {
      title: string;
      contents: string;
      url: string;
      blogname: string;
      thumbnail: string;
      datetime: string;
      isBookmark: boolean;
    };
  };
}

interface BlogSource {
  title: string;
  contents: string;
  url: string;
  blogname: string;
  thumbnail: string;
  datetime: string;
  isBookmark: boolean;
}
