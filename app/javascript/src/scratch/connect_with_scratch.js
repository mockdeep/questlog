import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  createScratch,
  deleteScratch,
  updateScratch,
} from 'src/scratch/action_creators';
import {scratchShape} from 'src/shapes';

function connectWithScratch(computeScratchKey, mapStateToProps, actionCreators) {
  function scratchMapStateToProps(state, ownProps) {
    const scratchKey = computeScratchKey(state, ownProps);

    return {
      scratchKey,
      scratch: state.scratch[scratchKey],
      wrappedComponentProps: mapStateToProps(state, ownProps),
    };
  }

  function scratchMapDispatchToProps(dispatch) {
    return {
      wrappedComponentActionCreators: bindActionCreators(actionCreators, dispatch),
      ...bindActionCreators({createScratch, deleteScratch, updateScratch}, dispatch),
    };
  }

  return function wrapComponentWithScratch(WrappedComponent) {
    class ConnectWithScratch extends React.Component {
      constructor(props) {
        super(props);
        autobind(this);
        this.props.createScratch(props.scratchKey);
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.scratchKey === this.props.scratchKey) { return; }

        this.props.createScratch(nextProps.scratchKey);
        this.props.updateScratch(nextProps.scratchKey, this.props.scratch);
        this.props.deleteScratch(this.props.scratchKey);
      }

      componentWillUnmount() {
        this.props.deleteScratch(this.props.scratchKey);
      }

      updateScratch(payload) {
        this.props.updateScratch(this.props.scratchKey, payload);
      }

      render() {
        return (
          <WrappedComponent
            {...this.props.wrappedComponentProps}
            {...this.props.wrappedComponentActionCreators}
            updateScratch={this.updateScratch}
            scratch={this.props.scratch || {}}
          />
        );
      }
    }

    ConnectWithScratch.displayName = `Scratch(${WrappedComponent.name})`;
    ConnectWithScratch.propTypes = {
      createScratch: PropTypes.func.isRequired,
      deleteScratch: PropTypes.func.isRequired,
      scratch: scratchShape,
      scratchKey: PropTypes.string.isRequired,
      updateScratch: PropTypes.func.isRequired,
      wrappedComponentActionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
      wrappedComponentProps: PropTypes.objectOf(PropTypes.any).isRequired,
    };

    return connect(
      scratchMapStateToProps,
      scratchMapDispatchToProps
    )(ConnectWithScratch);
  };
}

export default connectWithScratch;
