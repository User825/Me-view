import React from 'react';

import Header from 'containers/global/header/Header';
import Footer from 'components/global/footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Page, PageContent, PageFooter } from 'components/global/page';
import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404'
import Movie from 'pages/Movie';

import { paths } from 'config/';

function App() {
  return (
    <div>
      <Page>
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <PageContent>
            <Switch>
              <Route exact path={paths.MAIN} component={MainPage} />
              <Route
                path={paths.MOVIE}
                render={(props) => (
                  <Movie
                    id={props.match.params.id.replace(':', '')}
                    {...props}
                  />
                )}
              />
            <Route path="*">
              <Page404 />
            </Route>
   
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