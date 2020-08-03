import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

import "../style/home.css";
import { fetchSearch } from "../redux/actions";
import BlogList from "./BlogList";

interface Props {
  fetchSearch: (keyword: string) => void;
}

const Home = (props: Props) => {
  const [state, setState] = useState({ text: "" });

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      props.fetchSearch(state.text);
    }
  };

  const handleChangeText = (e: any) => {
    const text = e.target.value;

    setState((state) => ({ ...state, text }));
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
        onClick={() => props.fetchSearch(state.text)}
      />
      <Link to="/bookmark">
        <div className="link">
          <FontAwesomeIcon icon={faStar} /> 즐겨찾기 목록
        </div>
      </Link>
      <BlogList useSearch={true} />
    </div>
  );
};

const mapDispatchToProps = {
  fetchSearch,
};

export default connect(null, mapDispatchToProps)(Home);
