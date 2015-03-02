(function () {

  'use strict';

  Questlog.SessionsNew = React.createClass({
    render: function () {
      return (
        <div>
          <h1>Log in</h1>

          <form action='/sessions' acceptCharset='UTF-8' method='post'>
            <input
              type='hidden'
              name='authenticity_token'
              value={Questlog.authenticityToken()}
            />
            <p>
              <label htmlFor='email'>Email</label>
              <br />
              <input
                type='text'
                name='email'
                id='email'
                defaultValue={this.props.email}
              />
            </p>
            <p>
              <label htmlFor='password'>Password</label>
              <br />
              <input type='password' name='password' id='password' />
            </p>
            <p className='button'>
              <input type='submit' name='commit' value='Login' />
            </p>
          </form>
        </div>
      );
    }
  });

})();
