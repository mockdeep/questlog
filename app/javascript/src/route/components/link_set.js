import React from 'react';

import Link from 'src/route/containers/link';

function LinkSet(props) {
  const {links, route} = props;

  return links.map(({routeName, label}) => {
    if (route.name === routeName) {
      return (
        <span key={routeName} className={'task-filter'}>
          {label}
        </span>
      );
    }

    return (
      <Link key={routeName} to={routeName} className={'task-filter'}>
        {label}
      </Link>
    );
  });
}

export default LinkSet;
