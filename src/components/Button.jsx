import PropTypes from 'prop-types';

function Button({ children, handleClick }) {
  return (
    <div className="generic-bnt-container">
      <button type="button" onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
