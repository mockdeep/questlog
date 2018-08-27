import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {createScratch, deleteScratch, updateScratch}
  from 'src/scratch/action_creators';
import {scratchShape} from 'src/shapes';

const scratchActionCreators = {createScratch, deleteScratch, updateScratch};

function connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  actionCreators
) {
  function scratchMapStateToProps(state, ownProps) {
    const scratchKey = computeScratchKey(state, ownProps);

    return {
      scratchKey,
      scratch: state.scratch[scratchKey],
      wrappedProps: mapStateToProps(state, ownProps),
    };
  }

  function scratchMapDispatchToProps(dispatch) {
    return {
      wrappedActionCreators: bindActionCreators(actionCreators, dispatch),
      ...bindActionCreators(scratchActionCreators, dispatch),
    };
  }

  return function wrapComponentWithScratch(WrappedComponent) {
    class ConnectWithScratch extends React.Component<any, any> {
      static displayName: string;

      constructor(props) {
        super(props);
        autobind(this);

        const {createScratch: boundCreateScratch} = this.props;

        boundCreateScratch(props.scratchKey);
      }

      componentWillReceiveProps(nextProps) {
        const {
          createScratch: boundCreateScratch,
          deleteScratch: boundDeleteScratch,
          scratch,
          scratchKey,
          updateScratch: boundUpdateScratch,
        } = this.props;

        if (nextProps.scratchKey === scratchKey) { return; }

        boundCreateScratch(nextProps.scratchKey);
        boundUpdateScratch(nextProps.scratchKey, scratch);
        boundDeleteScratch(scratchKey);
      }

      componentWillUnmount() {
        const {deleteScratch: boundDeleteScratch, scratchKey} = this.props;

        boundDeleteScratch(scratchKey);
      }

      updateScratch(payload) {
        const {scratchKey, updateScratch: boundUpdateScratch} = this.props;

        boundUpdateScratch(scratchKey, payload);
      }

      render() {
        const {
          scratch,
          wrappedActionCreators,
          wrappedProps,
        } = this.props;

        return (
          <WrappedComponent
            {...wrappedProps}
            {...wrappedActionCreators}
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
      wrappedActionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
      wrappedProps: PropTypes.objectOf(PropTypes.any).isRequired,
      scratch: scratchShape,
    };

    return connect(
      scratchMapStateToProps,
      scratchMapDispatchToProps
    )(ConnectWithScratch);
  };
}

export default connectWithScratch;
