import React from 'react';
import Container from 'react-bootstrap/Container';

function LoginLayout({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default LoginLayout;
