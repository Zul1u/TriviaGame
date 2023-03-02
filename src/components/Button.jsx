import PropTypes from 'prop-types';

function Button({ children, handleClick }) {
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
