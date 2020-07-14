import React from 'react';
import paths from 'config/routerPaths';

import { Link } from 'react-router-dom';
import { Wrapper, Col, Row } from 'components/global/layout/';
import Typography from 'components/global/typography';

const mainPath = paths.MAIN;

function Page404() {
  document.title = 'Me view 404';

  return (
    <Wrapper verticalGap="lg">
      <Row fluid fullHeight verticalGap="lg" lg={{ column: true, center: true }} >
        <Col auto center>
          <Typography tagName="h2" size="xl" color="accent" isGlitch>
            404
          </Typography>
        </Col>
        <Col auto center>
          <Typography size="lg" color="light" weight="bold" isGlitch>
            Страница не найдена
          </Typography>
        </Col>
        <Col auto center>
          <Link to={mainPath}>
            <Typography size="sm" color="contrast" isUnderline>
              Вернутся на главную страницу
            </Typography>
          </Link>
        </Col>
      </Row>
    </Wrapper>
  );
}

Page404.propTypes = {};

export default Page404;
