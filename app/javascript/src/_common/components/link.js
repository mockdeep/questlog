import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as RRLink} from 'react-router-dom';

import {findRoute} from 'src/route/routes';

class Link extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  navigate() {
    if (this.props.onClick) { this.props.onClick(); }

    this.props.setRoute({name: this.props.to, ...this.props.params});
  }

  path() {
    return findRoute(this.props.to).toPath(this.props.params);
  }

  render() {
    const {className, children} = this.props;

    return (
      <RRLink to={this.path()} className={className} onClick={this.navigate}>
        {children}
      </RRLink>
    );
  }
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  params: PropTypes.object,
  setRoute: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
