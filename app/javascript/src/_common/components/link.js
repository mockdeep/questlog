import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as RRLink} from 'react-router-dom';

class Link extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  navigate() {
    if (this.props.onClick) { this.props.onClick(); }
  }

  path() {
    if (this.props.to === 'tag') {
      return `/${this.props.params.slug}`;
    }

    return `/${this.props.to}`;
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
  to: PropTypes.string.isRequired,
};

export default Link;
