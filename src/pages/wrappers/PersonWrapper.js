import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';

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
      document.title = `${response.person.name}`;
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
