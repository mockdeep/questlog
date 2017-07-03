import React from 'react';

import Link from 'src/_common/containers/link';

function WhatPage() {
  return (
    <div>
      <h1>{'What\'s a Questlog?'}</h1>
      <p>{'Wouldn\'t you like to know...'}</p>
      <Link to='privacy'>{'Privacy'}</Link>
    </div>
  );
}

export default WhatPage;
