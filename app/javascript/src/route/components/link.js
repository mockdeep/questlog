import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {mapValues} from 'lodash';

import {findRoute} from 'src/route/helpers';

class Link extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  navigate(event) {
    event.preventDefault();

    const {params, setRoute, to} = this.props;

    setRoute({name: to, ...params});
  }

  path() {
    const {params, to} = this.props;
    const pathParams = mapValues(params, value => value.toString());

    return findRoute(to).toPath(pathParams);
  }

  className() {
    const {to, routeName, className} = this.props;

    return routeName === to ? `${className} ${className}--active` : className;
  }

  render() {
    const {children} = this.props;

    return (
      <a
        href={this.path()}
        className={this.className()}
        onClick={this.navigate}
      >
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  routeName: PropTypes.string.isRequired,
  setRoute: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  params: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Link;
