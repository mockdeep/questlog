import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {findRoute} from 'src/route/routes';

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
    return findRoute(this.props.to).toPath(this.props.params);
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
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  setRoute: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
