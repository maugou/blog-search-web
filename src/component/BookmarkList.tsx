import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import BlogList from "./BlogList";

export const BookmarkList = () => {
  return (
    <div>
      <Link to="/">
        <div className="link">
          <FontAwesomeIcon icon={faSearch} /> 블로그 검색
        </div>
      </Link>
      <div>
        <BlogList />
      </div>
    </div>
  );
};
