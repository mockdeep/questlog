import React from 'react';

import authenticityToken from 'js/_helpers/authenticity_token';

const SessionsNew = React.createClass({
  render() {
    return (
      <div>
        <h1>{'Log in'}</h1>

        <form action='/sessions' acceptCharset='UTF-8' method='post'>
          <input
            type='hidden'
            name='authenticity_token'
            value={authenticityToken()}
          />
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
      </div>
    );
  },
});

export default SessionsNew;
