import React from 'react';
import { Box, Card, CardContent, Container, CssBaseline } from '@material-ui/core';

interface Props {
  link: any;
}

const WithoutAuthBase: React.FC<Props> = ({ children, link }) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={5} mb={2} textAlign="center">
        <img width="350" src="http://www.defensoria.ce.def.br/wp-content/uploads/2015/02/logo-horizontal.png" />
      </Box>
      <Card>
        <CardContent style={{ padding: 20 }}>{children}</CardContent>
      </Card>
      <Box mt={2} textAlign="right">
        {link}
      </Box>
    </Container>
  );
};

export default WithoutAuthBase;
