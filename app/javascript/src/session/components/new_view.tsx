import React from 'react';

import AuthenticityToken from 'src/_common/components/authenticity_token';

function SessionNewView() {
  return (
    <form
      action='/session'
      acceptCharset='UTF-8'
      method='post'
      className='login-form'
    >
      <h1>{'Log in'}</h1>
      <AuthenticityToken />
      <p>
        <label htmlFor='email'>{'Email'}</label>
        <br />
        <input type='text' name='session[email]' id='email' />
      </p>
      <p>
        <label htmlFor='password'>{'Password'}</label>
        <br />
        <input type='password' name='session[password]' id='password' />
      </p>
      <p className='button'>
        <input type='submit' name='commit' value='Login' />
      </p>
    </form>
  );
}

export default SessionNewView;
