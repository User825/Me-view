import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { paths } from 'config/';

import { ProfileSection, ProfileContentBox } from 'components/profileSection/';
import { Section } from 'components/global/section/';
import Typography from 'components/global/typography';
import { Row, Col } from 'components/global/layout/';
import { Card } from 'components/card/';

import ProfileDesc from 'containers/ProfileDesc';

function Person({ personData: { person, credits } }) {
  const topLevelItemsQuantity = 6;
  const topLevelItems = credits.slice(0, topLevelItemsQuantity);
  const [isMainPage, setMainPageStatus] = useState(true);

  const pageChange = () => setMainPageStatus(!isMainPage);

  return (
    <Section>
      <ProfileSection title={person.name} posterSrc={person.img}>
        <ProfileContentBox isVisible={isMainPage}>
          <Col gap="sm">
            <Typography tagName="h2" weight="bold" size="xl">
              {person.name}
            </Typography>
            {person.alsoKnow && (
              <Typography
                tagName="strong"
                weight="bold"
                size="sm"
                bottomIndent="lg"
              >
                ({person.alsoKnow})
              </Typography>
            )}
            <Typography tagName="p" weight="bold" size="sm" inlineChildren>
              <span>{person.birthDate}</span>
              {person.deathDate && <span>{` –  ${person.deathDate}`}</span>}
            </Typography>
            <Typography tagName="p" size="sm" bottomIndent="lg">
              {person.placeOfBirth}
            </Typography>
          </Col>
          {topLevelItems.length > 0 && (
            <section>
              <Col gap="sm" verticalGap="md">
                <Typography tagName="h3" weight="bold" size="md">
                  {`Извест${person.gender === 1 ? 'на' : 'ен'} по:`}
                </Typography>
              </Col>
              <Row>
                {topLevelItems.map((item) => {
                  const itemPath =
                    item.type === 'movie'
                      ? paths.MOVIE_id
                      : item.type === 'tv'
                      ? paths.TV_SHOW_id
                      : null;
                  return (
                    <Col
                      sm="6"
                      md="4"
                      lg="4"
                      gap="sm"
                      verticalGap="sm"
                      key={item.id}
                    >
                      <Link to={`${itemPath}:${item.id}`}>
                        <Card
                          imgSrc={item.img}
                          title={item.title}
                          desc={item.character}
                        />
                      </Link>
                    </Col>
                  );
                })}
              </Row>
              {credits.length > topLevelItemsQuantity && (
                <Col gap="sm">
                  <button
                    type="button"
                    className="reset-button"
                    onClick={pageChange}
                  >
                    <Typography
                      size="sm"
                      tagName="span"
                      isInteractiveOpacity
                      color="accent"
                    >
                      {`Смотреть всю фильмографию (${credits.length}) →`}
                    </Typography>
                  </button>
                </Col>
              )}
            </section>
          )}
          <Col gap="sm">
            <ProfileDesc desc={person.biography} homepage={person.homepage} />
          </Col>
        </ProfileContentBox>
        <ProfileContentBox isVisible={!isMainPage}>
          <Col gap="sm">
            <button type="button" className="reset-button" onClick={pageChange}>
              <Typography
                size="sm"
                tagName="span"
                isInteractiveOpacity
                color="accent"
              >
                {`← Вернуться к профилю актера`}
              </Typography>
            </button>
          </Col>
          <Row verticalGap="md">
            {credits.map((item) => {
              const itemPath =
                item.type === 'movie'
                  ? paths.MOVIE_id
                  : item.type === 'tv'
                  ? paths.TV_SHOW_id
                  : null;
              return (
                <Col
                  sm="6"
                  md="4"
                  lg="4"
                  gap="sm"
                  verticalGap="sm"
                  key={item.id}
                >
                  <Link {...(itemPath ? { to: `${itemPath}:${item.id}` } : {})}>
                    <Card
                      imgSrc={item.img}
                      title={item.title}
                      desc={item.character}
                    />
                  </Link>
                </Col>
              );
            })}
          </Row>
        </ProfileContentBox>
      </ProfileSection>
    </Section>
  );
}

Person.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      img: PropTypes.string,
      title: PropTypes.string,
      character: PropTypes.string,
    })
  ),
  person: PropTypes.shape({
    alsoKnow: PropTypes.string,
    biography: PropTypes.string,
    birthDate: PropTypes.string,
    deathDate: PropTypes.string,
    gender: PropTypes.number,
    img: PropTypes.string,
    homepage: PropTypes.string,
    name: PropTypes.string,
    placeOfBirth: PropTypes.string,
  }),
};

export default Person;
