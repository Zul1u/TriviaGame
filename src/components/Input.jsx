import PropTypes from 'prop-types';

export default function Input({
  labelValue,
  placeholderValue,
  inputValue,
  handleChange,
}) {
  return (
    <label htmlFor="generic-input-component" className="generic-input-label">
      <p>{labelValue}</p>
      <input
        type="text"
        id="generic-input-component"
        className="generic-input"
        placeholder={placeholderValue}
        value={inputValue}
        onChange={handleChange}
      />
    </label>
  );
}

Input.propTypes = {
  labelValue: PropTypes.string,
  placeholderValue: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  labelValue: '',
  placeholderValue: '',
};
