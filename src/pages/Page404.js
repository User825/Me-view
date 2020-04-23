import React from 'react';
import paths from 'config/routerPaths';

import { Link } from 'react-router-dom';
import { Wrapper, Container, Row } from 'components/global/layout/';
import Typography from 'components/global/typography';

const mainPath = paths.MAIN;

function Page404(props) {
  return (
    <Wrapper verticalGap="lg">
      <Container fluid verticalGap="lg">
        <Row fluid lg={{ center: true }}>
          <Typography tagName="h2" size="xl" color="accent" isGlitch>
            404
          </Typography>
        </Row>
        <Row fluid lg={{ center: true }}>
          <Typography size="lg" color="light" weight="bold" isGlitch>
            Страница не найдена
          </Typography>
        </Row>
        <Row fluid lg={{ center: true }} verticalGap="lg">
          <Link to={mainPath}>
            <Typography size="sm" color="contrast" isUnderline>
              Вернутся на главную страницу
            </Typography>
          </Link>
        </Row>
      </Container>
    </Wrapper>
  );
}

Page404.propTypes = {};

export default Page404;
