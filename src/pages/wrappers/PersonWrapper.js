import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';

import { AnimatePresence } from 'framer-motion';

import Preloader from 'components/preloader/';

import AnimationPageLoad from 'containers/global/AnimationPageLoad';
import Head from 'containers/global/Head';
import Person from 'pages/Person';

function PersonWrapper({ id, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [personData, setPersonData] = useState();

  useEffect(() => {
    getPersonData(id);
  }, [id]);

  const getPersonData = (id) => {
    setIsLoading(true);

    server.getPerson(id).then((response) => {
      setPersonData(response);
      setIsLoading(false);
    });
  };

  return (
    <AnimatePresence>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Head
            article
            title={personData.person.name}
            desc={`${personData.person.name}: биография и фильмография`}
            img={personData.person.img}
            imgAlt={
              personData.person.img
                ? `Постер к фильму ${personData.person.name}`
                : null
            }
            url={`https://user825.github.io/Me-view${props.location.pathname}`}
          />
          <AnimationPageLoad>
            <Person personData={personData} {...props} />
          </AnimationPageLoad>
        </>
      )}
    </AnimatePresence>
  );
}

PersonWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PersonWrapper;
