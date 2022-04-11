import React, { useRef } from "react";
import _isEmpty from "lodash/isEmpty";
import _isFunction from "lodash/isFunction";
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import DropdownMultiSelect from "react-multiselect-dropdown-bootstrap";

export const MultiSelectField = ({
  label,
  className,
  onChange,
  options = [],
  placeholder = "Select...",
  field: { name },
  form: { errors, touched, handlerBlur, handleChange, values },
}) => {
  const ref = useRef(null);
  const isInValid = touched[name] && !_isEmpty(errors[name]);
  const handleOnChange = (selected) => {
    // if (!touched[name]) {
    //   handlerBlur({ target: { name } });
    // }
    handleChange({ target: { name, value: selected } });
    if (_isFunction(onChange)) {
      onChange(name.selected);
    }
  };
  return (
    <Form.Group
      controlId={name}
      className={`floating-input ${className}`}
      ref={ref}
    >
      <Form.Label>{label}</Form.Label>

      {options.length && (
        <DropdownMultiSelect
          name={name}
          selected={values[name]}
          options={options}
          buttonClass="form-control"
          placeholder={placeholder}
          handleOnChange={handleOnChange}
        />
      )}
      <Overlay target={ref.current} show={isInValid} placement="bottom">
        {(props) => (
          <Tooltip className="validation-msg" {...props}>
            {errors[name]}
          </Tooltip>
        )}
      </Overlay>
    </Form.Group>
  );
};
