import React, { useRef, useState } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Form from "react-bootstrap/Form";
import SVG from "react-inlinesvg";

export const PasswordField = ({
  label,
  helper,
  disable,
  required,
  type = "password",
  className = "",
  field: { name },
  fieldAs = "input",
  form: { errors, touched, handleChange, handlerBlur, values },
  ...others
}) => {
  const value = _get(values, name, "");
  const ref = useRef(null);
  const isInValid = touched[name] && !_isEmpty(errors[name]);
  const error = _get(errors, name, null);
  const onToggleView = () => {
    ref?.current.focus();
  };
  const onBlur = (e) => {
    others.onBlur && others.onBlur(e);
  };
  return (
    <Form.Group
      controlId={name}
      className={`form-input password-field ${className}`}
    >
      <Form.Label onClick={onToggleView}>
        {label} {required && "*"}
      </Form.Label>
      <Form.Control
        as={fieldAs}
        type={type}
        isInvalid={isInValid}
        ref={ref}
        value={value}
        autoComplete="off"
        {...others}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder="Password"
      />

      <span className="password-eye" onClick={onToggleView}>
        <SVG
          cacheRequests={true}
          src={
            type === "password"
              ? `/static/svg/visibility.svg`
              : `/static/svg/visibility_off.svg`
          }
        />{" "}
      </span>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Text className="text-muted">{helper}</Form.Text>
    </Form.Group>
  );
};
