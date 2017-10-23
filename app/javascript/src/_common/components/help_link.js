import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import HelpModal from 'src/_common/components/help_modal';

class HelpLink extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  openHelpModal() {
    this.props.updateCommon({helpModalOpen: true});
  }

  closeHelpModal(event) {
    event.stopPropagation();
    this.props.updateCommon({helpModalOpen: false});
  }

  render() {
    return (
      <button className='btn btn-link' onClick={this.openHelpModal}>
        {'Help'}
        <HelpModal
          isOpen={this.props.helpModalOpen}
          closeModal={this.closeHelpModal}
        />
      </button>
    );
  }
}

HelpLink.propTypes = {
  helpModalOpen: PropTypes.bool.isRequired,
  updateCommon: PropTypes.func.isRequired,
};

export default HelpLink;
