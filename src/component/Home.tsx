import React, { useState } from "react";
import { connect } from "react-redux";

import { fetchSearch } from "../redux/actions";

interface Props extends SearchResult {
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
        value={state.text}
        onKeyPress={handleKeyPress}
        onChange={handleChangeText}
        autoFocus
      />
    </div>
  );
};

const mapStateToProps = (state: { searchResult: SearchResult }) => {
  return { ...state.searchResult };
};

const mapDispatchToProps = {
  fetchSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
