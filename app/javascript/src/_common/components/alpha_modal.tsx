import Modal from 'react-modal';
import React from 'react';

import {CloseModal} from 'src/_common/components/modal_link';

type Props = {
  isOpen: boolean;
  closeModal: CloseModal;
};

function AlphaModal({isOpen, closeModal}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      onRequestClose={closeModal}
    >
      <button className='modal__close-button' onClick={closeModal}>
        <i className='fas fa-times fa-2x' />
      </button>
      <h3>{'What does "alpha" mean?'}</h3>
      <p>
        {`
          "Alpha" means that this feature is under active development and not
          in a particularly functional state. You may be best to avoid it. If
          you're curious, however, or want to help guide the direction of the
          feature, feel free to take a peek.

        `}
        <a href='mailto:robert@boon.gl'>{'Feedback'}</a>{' is very welcome.'}
      </p>
      <h3>{'Why make this available?'}</h3>
      <p>
        {`
          Mostly for the sake of simplicity. When developing features it can be
          helpful to test them out in a real live environment. It also seems
          like it makes for a fun opportunity for users to see how the sausage
          is made and inform the process.
        `}
      </p>
    </Modal>
  );
}

export default AlphaModal;
