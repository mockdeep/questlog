import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {elmSourceShape} from 'src/shapes';

class ReactElmWrapper extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    const app = this.props.src.embed(this.node, this.props.flags);

    if (this.props.ports) { this.props.ports(app.ports); }
  }

  shouldComponentUpdate() {
    return false;
  }

  storeNode(node) {
    this.node = node;
  }

  render() {
    return <div ref={this.storeNode} />;
  }
}

ReactElmWrapper.propTypes = {
  src: elmSourceShape.isRequired,
  flags: PropTypes.objectOf(PropTypes.any),
  ports: PropTypes.func,
};

export default ReactElmWrapper;
