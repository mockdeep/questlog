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

    this.props.setRoute({name: this.props.to, ...this.props.params});
  }

  path() {
    const params = mapValues(this.props.params, (value) => value.toString());

    return findRoute(this.props.to).toPath(params);
  }

  render() {
    const {className, children} = this.props;

    return (
      <a href={this.path()} className={className} onClick={this.navigate}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.string,
  params: PropTypes.objectOf(PropTypes.string),
  setRoute: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
