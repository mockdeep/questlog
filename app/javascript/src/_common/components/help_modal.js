import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React from 'react';

function HelpModal({isOpen, closeModal}) {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      onRequestClose={closeModal}
    >
      <button className='modal__close-button' onClick={closeModal}>
        <i className='fa fa-times fa-2x' />
      </button>
      <h3>{'Help'}</h3>
      <p>
        {
          `You can type different markers when adding your tasks in order to
            set priority, repeats, and so on. Feel free to mix and match!
            Here's a full list:`
        }
      </p>
      <table>
        <thead>
          <tr>
            <th>{'marker'}</th>
            <th>{'examples'}</th>
            <th>{'description'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='modal__cell modal__marker'>
              {'!'}<strong>{' or '}</strong>{"'"}
            </td>
            <td className='modal__cell'>{'!1 !2 \'3'}</td>
            <td className='modal__cell'>
              {
                `Set the priority of the task. Priority 1 tasks will appear
                  before Priority 2 tasks in your queue, and a task with any
                  priority will come before a task with no priority.  '1 is
                  handy since !1 can be a pain to type on mobile.`
              }
            </td>
          </tr>
          <tr>
            <td className='modal__cell modal__marker'>{'#'}</td>
            <td className='modal__cell'>
              {'#at-home #errand #standing-in-line'}
            </td>
            <td className='modal__cell'>
              {
                `Adds a tag to the task. When tasks have been tagged, you will
                  see buttons on the page which will allow you to select
                  between different tags depending on where you're at.`
              }
            </td>
          </tr>
          <tr>
            <td className='modal__cell modal__marker'>{'@'}</td>
            <td className='modal__cell'>
              {'@10:30am @10/05/2015 @10/05/2015-10:30am'}
            </td>
            <td className='modal__cell'>
              {
                `Sets the date and/or time when a task will be released into
                  your queue. So if you set the date for tomorrow at 10:30am,
                  you will not see it in your queue until then.`
              }
            </td>
          </tr>
          <tr>
            <td className='modal__cell modal__marker'>{'*'}</td>
            <td className='modal__cell'>{'*1d *3h *5m *1y'}</td>
            <td className='modal__cell'>
              {
                `Repeat the task every day, 3 hours, 5 minutes, or 1 year. A
                  full list of repeat abbreviations are: `
              }
              <strong>{'s'}</strong>{' -- seconds, '}
              <strong>{'m'}</strong>{' or '}
              <strong>{'mi'}</strong>{' -- minutes, '}
              <strong>{'h'}</strong>{' -- hours, '}
              <strong>{'d'}</strong>{' -- days, '}
              <strong>{'mo'}</strong>{' -- months, and '}
              <strong>{'y'}</strong>{' -- years.  '}
              {
                `As of yet we don't have a way to repeat at a particular time
                  of day or day of the week/month. The repeat will start
                  counting from the moment you mark it as done. So if you say
                  *3d, it will reappear in your queue 3 days after you mark it
                  as finished.`
              }
            </td>
          </tr>
          <tr>
            <td className='modal__cell modal__marker'>{'~'}</td>
            <td className='modal__cell'>{'~1d ~3h ~5m'}</td>
            <td className='modal__cell'>
              {
                `Sets a time estimate on the task. This impacts how much you
                  are allowed to place in timeframes and can be used with smart
                  tags to find tasks above or below a certain estimate. It uses
                  the same abbreviations as repeats.`
              }
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}

HelpModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default HelpModal;
