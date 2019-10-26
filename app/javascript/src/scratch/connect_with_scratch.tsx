import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators, ActionCreator, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {
  createScratch, deleteScratch, updateScratch,
  Payload,
} from 'src/scratch/action_creators';
import {scratchShape} from 'src/shapes';

type Props = {
  [key: string]: any
};
const scratchActionCreators = {createScratch, deleteScratch, updateScratch};

function connectWithScratch(
  computeScratchKey: Function,
  mapStateToProps: Function,
  actionCreators: {[key: string]: ActionCreator<any>},
) {
  function scratchMapStateToProps(state: State, ownProps: Props) {
    const scratchKey = computeScratchKey(state, ownProps);

    return {
      scratchKey,
      scratch: state.scratch[scratchKey],
      wrappedProps: mapStateToProps(state, ownProps),
    };
  }

  function scratchMapDispatchToProps(dispatch: Dispatch) {
    return {
      wrappedActionCreators: bindActionCreators(actionCreators, dispatch),
      ...bindActionCreators(scratchActionCreators, dispatch),
    };
  }

  return function wrapComponentWithScratch(WrappedComponent: any) {
    class ConnectWithScratch extends Component<Props, any> {
      static displayName: string;

      constructor(props: Props) {
        super(props);
        autobind(this);

        const {createScratch: boundCreateScratch} = this.props;

        boundCreateScratch(props.scratchKey);
      }

      componentWillReceiveProps(nextProps: Props) {
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

      updateScratch(payload: Payload) {
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
      scratchMapDispatchToProps,
    )(ConnectWithScratch);
  };
}

export default connectWithScratch;
