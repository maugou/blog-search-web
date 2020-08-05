import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { BlogList } from "./BlogList";
import { connect } from "react-redux";
import { toggleBookmark } from "../redux/actions";

interface Props {
  toggleBookmark: (blogUrl: string) => void;
  results: BlogSource[];
}

const Bookmarks = (props: Props) => {
  return (
    <div>
      <Link to="/">
        <div className="link">
          <FontAwesomeIcon icon={faSearch} /> 블로그 검색
        </div>
      </Link>

      <BlogList
        documents={props.results}
        toggleBookmark={props.toggleBookmark}
      />
    </div>
  );
};

const mapStateToProps = (state: Store) => {
  const { documents, bookmark } = state;

  return {
    results: bookmark.map((url: string) => documents[url]),
  };
};

const mapDispatchToProps = {
  toggleBookmark,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
