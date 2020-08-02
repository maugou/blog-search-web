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
      datetime: Date;
    }
  ];
}
