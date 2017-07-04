import PropTypes from 'prop-types';
import React from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';

class Link extends React.Component {
  to() {
    if (this.props.to === 'tag') {
      return `/${this.props.params.slug}`;
    }

    return `/${this.props.to}`;
  }

  render() {
    return (
      <ReactRouterLink
        to={this.to()}
        className={this.props.className}
        onClick={this.props.onClick}
      >{this.props.children}</ReactRouterLink>
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
