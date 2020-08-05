import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./component/Home";
import Bookmarks from "./component/Bookmarks";
import { configureStore } from "./redux/store";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/bookmark" component={Bookmarks} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
