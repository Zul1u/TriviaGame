import PropTypes from 'prop-types';

function Button({ children, handleClick, submitButton }) {
  return (
    <div className="generic-bnt-container">
      <button type={submitButton ? 'submit' : 'button'} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  submitButton: PropTypes.bool,
};
Button.defaultProps = {
  submitButton: false,
};

export default Button;
