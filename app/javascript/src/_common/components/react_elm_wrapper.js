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
    const {flags, ports, src} = this.props;
    const app = src.embed(this.node, flags);

    if (ports) { ports(app.ports); }
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
