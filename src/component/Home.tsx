import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

import "../style/home.css";
import { fetchBlogs, toggleBookmark } from "../redux/actions";
import { BlogList } from "./BlogList";

interface Props {
  fetchBlogs: (keyword: string, page: number) => void;
  toggleBookmark: (blogUrl: string) => void;
  pageCount: number;
  results: BlogSource[];
  keyword: string;
  isFetching: boolean;
  pageNumber: number;
  error: boolean;
}

const Home = (props: Props) => {
  const [searchKeyword, setSearchKeyword] = useState(props.keyword || "");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      props.fetchBlogs(searchKeyword, 1);
    }
  };

  const handleChangeText = (e: any) => {
    const text = e.target.value;

    setSearchKeyword(text);
  };

  const handleChangePage = (page: { selected: number }) => {
    props.fetchBlogs(searchKeyword, page.selected + 1);
  };

  let content;

  if (props.isFetching) {
    content = (
      <div className="spinner">
        <img
          src={require("../images/spinner.gif")}
          alt={require("../images/spinner.gif")}
          width={70}
        />
      </div>
    );
  } else if (props.error) {
    content = (
      <div className="search-result">
        오류가 발생하였습니다.
        <div className="notice">
          ㆍ검색어의 단어 수를 줄이거나, 보다 일반적인 단어로 검색해 보세요.
          <br />
          ㆍ두 단어 이상의 키워드로 검색 하신 경우, 정확하게 띄어쓰기를 한 후
          검색해 보세요.
          <br />
          ㆍ키워드에 있는 특수문자를 뺀 후에 검색해 보세요.
        </div>
      </div>
    );
  } else if (props.results.length > 0) {
    content = (
      <div>
        <BlogList
          documents={props.results}
          toggleBookmark={props.toggleBookmark}
        />
        <div className="issuesPagination">
          <ReactPaginate
            pageCount={props.pageCount}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            forcePage={props.pageNumber - 1}
            onPageChange={(page) => handleChangePage(page)}
            containerClassName="pagination"
          />
        </div>
      </div>
    );
  } else if (props.keyword) {
    content = (
      <div className="search-result">
        "{props.keyword}" 에 대한 검색결과가 없습니다.
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        className="text-input"
        value={searchKeyword}
        onKeyPress={handleKeyPress}
        onChange={handleChangeText}
        placeholder="검색"
        autoFocus
      />
      <FontAwesomeIcon
        className="search-icon"
        icon={faSearch}
        size="lg"
        onClick={() => props.fetchBlogs(searchKeyword, 1)}
      />
      <Link to="/bookmark">
        <div className="link">
          <FontAwesomeIcon icon={faStar} /> 즐겨찾기 목록
        </div>
      </Link>
      {content}
    </div>
  );
};

const mapStateToProps = (state: Store) => {
  const {
    documents,
    searchInfo: { meta, keyword, pageNumber, isFetching, error, docUrl },
  } = state;

  return {
    keyword,
    pageCount: Math.min(50, meta.pageable_count / 10) || 1,
    pageNumber,
    isFetching,
    error,
    results: docUrl.map((url: string) => documents[url]),
  };
};

const mapDispatchToProps = {
  fetchBlogs,
  toggleBookmark,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
