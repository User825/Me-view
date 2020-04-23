import React from 'react';

import Header from 'containers/global/header/Header';
import Footer from 'components/global/footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Page, PageContent, PageFooter } from 'components/global/page';
import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404'
import Movie from 'pages/Movie';
import Movie1 from 'pages/Movie_1';

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
              {/* <Route
                path={paths.MOVIE}
                render={(props) => (
                  <Movie
                    id={props.location.pathname.replace(paths.MOVIE, '')}
                    {...props}
                  />
                )}
              /> */}
              <Route
                path={paths.MOVIE_full}
                component={Movie1}
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
{/* <Route
path={`${process.env.PUBLIC_URL}/movie/:id`}
component={Movie1}
> */}