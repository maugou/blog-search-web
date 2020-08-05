import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

import "../style/home.css";
import { fetchSearch } from "../redux/actions";
import BlogList from "./BlogList";

interface Props extends SearchInfo {
  fetchSearch: (keyword: string, page: number) => void;
  pageCount: number;
}

const Home = (props: Props) => {
  const [state, setState] = useState({
    text: props.keyword || "",
  });

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      props.fetchSearch(state.text, 1);
    }
  };

  const handleChangeText = (e: any) => {
    const text = e.target.value;

    setState((state) => ({ ...state, text }));
  };

  const handleChangePage = (page: { selected: number }) => {
    props.fetchSearch(state.text, page.selected + 1);
  };

  return (
    <div>
      <input
        type="text"
        className="text-input"
        value={state.text}
        onKeyPress={handleKeyPress}
        onChange={handleChangeText}
        placeholder="검색"
        autoFocus
      />
      <FontAwesomeIcon
        className="search-icon"
        icon={faSearch}
        size="lg"
        onClick={() => props.fetchSearch(state.text, 1)}
      />
      <Link to="/bookmark">
        <div className="link">
          <FontAwesomeIcon icon={faStar} /> 즐겨찾기 목록
        </div>
      </Link>

      {props.meta?.total_count !== 0 ? (
        <div>
          <BlogList useSearch={true} />
          {props.meta && (
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
          )}
        </div>
      ) : (
        <div className="search-result">
          "{props.keyword}" 에 대한 검색결과가 없습니다.
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: {
  searchInfo: SearchInfo;
  bookmark: [];
  documents: NewDocuments;
}) => {
  const {
    searchInfo: { meta, keyword, pageNumber },
  } = state;

  return {
    meta,
    keyword,
    pageCount: meta?.pageable_count / 10 < 50 ? meta.pageable_count / 10 : 50,
    pageNumber,
  };
};

const mapDispatchToProps = {
  fetchSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
