import React from 'react';
import type {ReactElement} from 'react';

import authenticityToken from 'src/_helpers/authenticity_token';

function AuthenticityToken(): ReactElement {
  return (
    <input
      type='hidden'
      name='authenticity_token'
      value={authenticityToken()}
    />
  );
}

export default AuthenticityToken;
