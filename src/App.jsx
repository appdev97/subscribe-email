import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/header";

import PublishPage from "./pages/publish";
import SubscribePage from "./pages/subscribe";
import DetailsPage from "./pages/details";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/subscribe" component={SubscribePage} />
        <Route path="/publish" component={PublishPage} />
        <Route path="/messages/:id" component={DetailsPage} />
        <Redirect to="/subscribe" />
      </Switch>
    </div>
  );
};

export default App;
