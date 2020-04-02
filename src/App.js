import React from "react";

import Header from "containers/global/header/Header";
import Footer from "components/global/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Page, PageContent, PageFooter } from "components/global/page";
import MainPage from "pages/MainPage";
// import Movie from "pages/Movie";

import { paths } from "config/";

function App() {
  return (
    <div>
      <Page>
        <Router>
          <Header />
          <PageContent>
          <Switch>
            <Route exact path={paths.MAIN} component={MainPage} />
            {/* <Route path={paths.MOVIE} render={props => <Movie {...props} />} /> */}
          </Switch>
        </PageContent>
        </Router>
        <PageFooter>
          <Footer />
        </PageFooter>
      </Page>
    </div>
  );
}

export default App;
