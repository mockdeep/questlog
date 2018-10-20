import autobind from 'class-autobind';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import React from 'react';

import grab from 'src/_helpers/grab';
import AlphaModal from 'src/_common/components/alpha_modal';
import HelpModal from 'src/_common/components/help_modal';

const MODALS = {
  alpha: AlphaModal,
  help: HelpModal,
};

export type Props = {
  children: string | JSX.Element;
  className?: string;
  modalName: string;
  openModalId?: string;
  updateCommon: Function;
};

class ModalLink extends React.Component<Props, any> {
  modalId: string;

  constructor(props: Props) {
    super(props);
    autobind(this);
    this.modalId = `${props.modalName}-${nanoid()}`;
  }

  openModal() {
    const {updateCommon} = this.props;

    updateCommon({openModalId: this.modalId});
  }

  closeModal(event: React.SyntheticEvent) {
    event.stopPropagation();

    const {updateCommon} = this.props;

    updateCommon({openModalId: null});
  }

  render() {
    const {children, className, openModalId, modalName} = this.props;
    const Modal = grab(MODALS, modalName);

    return (
      <span className={className}>
        <button className={'btn btn-link'} onClick={this.openModal}>
          {children}
        </button>
        <Modal
          isOpen={openModalId === this.modalId}
          closeModal={this.closeModal}
        />
      </span>
    );
  }
}

ModalLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  modalName: PropTypes.string.isRequired,
  updateCommon: PropTypes.func.isRequired,
  className: PropTypes.string,
  openModalId: PropTypes.string,
};

export default ModalLink;
