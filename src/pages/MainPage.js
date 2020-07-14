import React from 'react';
import { changeColorsSchema } from 'utils/';
import { server } from 'server/';
import { paths } from 'config/';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';

import { Tab, Tabs, TabList, TabPanel } from 'components/tabs/';
import { Section } from 'components/global/section/';
import InfiniteCardList from 'containers/InfiniteCardList';
import NowPlayedMovies from 'containers/NowPlayedMovies';

const scrollIntoViewSmoothly =
  'scrollBehavior' in document.documentElement.style
    ? scrollIntoView
    : smoothScrollIntoView;

class MainPage extends React.Component {
  state = {
    activeTabIndex: 0,
  };

  componentDidMount() {
    changeColorsSchema('');
    document.title = 'Me view';
  }

  getPopularMovies = (page) => {
    return server.getPopularMovies(page).then((response) => {
      const { movies, totalPages } = response;
      return {
        cards: movies,
        totalPages,
      };
    });
  };

  getPopularShows = (page) => {
    return server.getPopularShows(page).then((response) => {
      const { shows, totalPages } = response;
      return {
        cards: shows,
        totalPages,
      };
    });
  };

  changeTabs = (selectedIndex, lastIndex, evt) => {
    this.setState({ activeTabIndex: selectedIndex });
    scrollIntoViewSmoothly(evt.target, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
      boundary: document.getElementById('page-root'),
    });
  };

  render() {
    return (
      <>
        <NowPlayedMovies />
        <Section title="Популярные фильмы и сериалы" isHiddenTitle gap="">
          <Tabs
            selectedIndex={this.state.activeTabIndex}
            onSelect={this.changeTabs}
          >
            <TabList>
              <Tab>Популярные фильмы</Tab>
              <Tab>Популярные сериалы</Tab>
            </TabList>
            <TabPanel>
              <InfiniteCardList
                pageRef = {this.props.pageRef}
                fetchCards={this.getPopularMovies}
                linkPrefixPath={paths.MOVIE_id}
              />
            </TabPanel>
            <TabPanel>
              <InfiniteCardList
                pageRef = {this.props.pageRef}
                fetchCards={this.getPopularShows}
                linkPrefixPath={paths.TV_SHOW_id}
              />
            </TabPanel>
          </Tabs>
        </Section>
      </>
    );
  }
}

MainPage.propTypes = {};

export default MainPage;
