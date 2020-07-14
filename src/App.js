import React from 'react';

import Header from 'containers/global/header/Header';
import Footer from 'components/global/footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Page, PageContent, PageFooter } from 'components/global/page';
import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import TVShowWrapper from 'pages/wrappers/TVShowWrapper'
import MovieWrapper from 'pages/wrappers/MovieWrapper'
import PersonWrapper from 'pages/wrappers/PersonWrapper'

import { paths } from 'config/';

import './styles/index.css';


function App() {
  return (
    <Page>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <PageContent>
          <Switch>
            <Route
              exact
              path={paths.MAIN}
              render={(props) => <MainPage {...props} />}
            />
            <Route
              path={paths.MOVIE}
              render={(props) => (
                <MovieWrapper
                  id={props.match.params.id.replace(':', '')}
                  {...props}
                />
              )}
            />
            <Route
              path={paths.TV_SHOW}
              render={(props) => (
                <TVShowWrapper
                  id={props.match.params.id.replace(':', '')}
                  {...props}
                />
              )}
            />
            <Route
              path={paths.PERSON}
              render={(props) => (
                <PersonWrapper
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
  );
}

export default App;
