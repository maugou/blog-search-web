import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./component/Home";
import { BookmarkList } from "./component/BookmarkList";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/bookmark" component={BookmarkList} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
