import React from 'react';
import PropTypes from 'prop-types';
import { paths } from 'config/';

import { Link } from 'react-router-dom';

import Typography from 'components/global/typography';

function CreditsDetails({ credits, onMoreCreditsChange }) {
  const { directors, actors } = credits;
  const headActors = actors.slice(0, 4);
  const otherActors = actors.slice(4);
  const director = directors[0];

  return (
    <>
      {director && (
        <Typography size="sm" bottomIndent="sm" inlineChildren>
          {`Режиссёр: `}
          <Link
            to={{
              pathname: `${paths.PERSON_id}:${director.id}`,
            }}
            key={director.id}
          >
            <Typography
              tagName="span"
              isUnderline
              isInteractiveOpacity
              color="accent"
            >
              {` ${director.name}`}
            </Typography>
          </Link>
        </Typography>
      )}
      {headActors.length > 0 && (
        <Typography size="sm" bottomIndent="md" inlineChildren>
          {`Актёры: `}
          {headActors.map((actor, index, actorsArr) => (
            <Link
              to={{
                pathname: `${paths.PERSON_id}:${actor.id}`,
              }}
              key={actor.id}
            >
              <Typography
                tagName="span"
                isUnderline
                color="accent"
                isInteractiveOpacity
              >
                {`${actor.name}`}
              </Typography>
              <Typography tagName="span" color="accent">
                {`${index !== actorsArr.length - 1 ? ',  ' : ''}`}
              </Typography>
            </Link>
          ))}
        </Typography>
      )}
      {otherActors.length > 0 && (
        <Typography size="sm" bottomIndent="lg" inlineChildren>
          <button
            type="button"
            className="reset-button"
            onClick={onMoreCreditsChange}
          >
            <Typography tagName="span" isInteractiveOpacity color="accent">
              {`Смотреть всех актеров(${actors.length}) →`}
            </Typography>
          </button>
        </Typography>
      )}
    </>
  );
}

CreditsDetails.propTypes = {
  credits: PropTypes.object.isRequired,
  onMoreCreditsChange: PropTypes.func,
};

export default CreditsDetails;
