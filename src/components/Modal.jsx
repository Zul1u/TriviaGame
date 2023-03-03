import PropTypes from 'prop-types';

function Modal({ children, isOpen, isClosed }) {
  return (
    isOpen && (
      <div className="bg-modal">
        <div className="modal-container">
          <div className="close-modal-container">
            <button type="button" onClick={isClosed} className="close-modal">
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isClosed: PropTypes.func.isRequired,
};

export default Modal;
