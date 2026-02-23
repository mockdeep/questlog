import type {ReactElement} from "react";

import {authenticityToken} from "helpers/authenticity_token";

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
