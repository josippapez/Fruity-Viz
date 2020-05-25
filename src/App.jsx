import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./components/Homepage/Homepage"
import Navbar from "./components/layout/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
