import React, { useRef } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import SVG from "react-inlinesvg";

export const SelectField = ({
  label,
  disabled,
  className,
  onChange,
  options = [],
  placeholder,
  field: { name },
  form: { errors, touched, handlerBlur, handleChange, values },
}) => {
  const ref = useRef(null);
  const isInValid = touched[name] && !_isEmpty(errors[name]);
  const value = _get(values, name, "");

  return (
    <Form.Group controlId={name} className={`floating-input ${className}`}>
      <Form.Label>{label}</Form.Label>

      <Form.Control
        as="select"
        name={name}
        isInvalid={isInValid}
        onChange={onChange || handleChange}
        onBlur={handlerBlur}
        disabled={disabled}
        ref={ref}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.key} value={opt.key} disabled={opt?.disabled}>
            {opt.label}
          </option>
        ))}
      </Form.Control>
      <Overlay target={ref.current} show={isInValid} placement="bottom">
        {(props) => (
          <Tooltip className="validation-msg" {...props}>
            {errors[name]}
          </Tooltip>
        )}
      </Overlay>
      <SVG
        cacheRequests={true}
        className="arrow-down"
        src={`/static/svg/keyboard_arrow_down.svg`}
      />
    </Form.Group>
  );
};
