import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { setMetaShareContent } from 'utils/';

import { AnimatePresence } from 'framer-motion';

import Preloader from 'components/preloader/';

import AnimationPageLoad from 'containers/global/AnimationPageLoad';
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
      const metaOptions = {
        title: response.person.name,
        desc: `${response.person.name}: биография и фильмография`,
        img: response.person.img,
        imgAlt: response.person.img ? `Фото ${response.person.name}` : null,
        url: props.location.pathname
          ? `%PUBLIC_URL%${props.location.pathname}`
          : null,
      };

      setMetaShareContent(metaOptions);
      setPersonData(response);
      setIsLoading(false);
    });
  };

  return (
    <AnimatePresence>
      {isLoading ? (
        <Preloader />
      ) : (
        <AnimationPageLoad>
          <Person personData={personData} {...props} />
        </AnimationPageLoad>
      )}
    </AnimatePresence>
  );
}

PersonWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PersonWrapper;
