import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as scratchActionCreators from 'src/scratch/action_creators';
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
      ...bindActionCreators(scratchActionCreators, dispatch),
    };
  }

  return function wrapComponentWithScratch(WrappedComponent) {
    class ConnectWithScratch extends React.Component {
      constructor(props) {
        super(props);
        autobind(this);

        const {createScratch} = this.props;

        createScratch(props.scratchKey);
      }

      componentWillReceiveProps(nextProps) {
        const {
          createScratch,
          deleteScratch,
          scratch,
          scratchKey,
          updateScratch,
        } = this.props;

        if (nextProps.scratchKey === scratchKey) { return; }

        createScratch(nextProps.scratchKey);
        updateScratch(nextProps.scratchKey, scratch);
        deleteScratch(scratchKey);
      }

      componentWillUnmount() {
        const {deleteScratch, scratchKey} = this.props;

        deleteScratch(scratchKey);
      }

      updateScratch(payload) {
        const {scratchKey, updateScratch} = this.props;

        updateScratch(scratchKey, payload);
      }

      render() {
        const {
          scratch,
          wrappedComponentActionCreators,
          wrappedComponentProps,
        } = this.props;

        return (
          <WrappedComponent
            {...wrappedComponentProps}
            {...wrappedComponentActionCreators}
            updateScratch={this.updateScratch}
            scratch={scratch || {}}
          />
        );
      }
    }

    ConnectWithScratch.displayName = `Scratch(${WrappedComponent.name})`;
    ConnectWithScratch.propTypes = {
      createScratch: PropTypes.func.isRequired,
      deleteScratch: PropTypes.func.isRequired,
      scratchKey: PropTypes.string.isRequired,
      updateScratch: PropTypes.func.isRequired,
      wrappedComponentActionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
      wrappedComponentProps: PropTypes.objectOf(PropTypes.any).isRequired,
      scratch: scratchShape,
    };

    return connect(
      scratchMapStateToProps,
      scratchMapDispatchToProps
    )(ConnectWithScratch);
  };
}

export default connectWithScratch;
