import React, { useRef } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Form from "react-bootstrap/Form";

export const TextField = ({
  label,
  helper,
  disable,
  required,
  type = "text",
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
  const onLabelClick = (e) => {
    ref.current.focus();
  };
  const onBlur = (e) => {
    // handlerBlur(e);
    others.onBlur && others.onBlur(e);
  };
  // if (type === "password") {
  //   return (
  //     <PasswordField
  //       ref={ref}
  //       name={name}
  //       label={label}
  //       value={value}
  //       error={error}
  //       helper={helper}
  //       onBlur={onBlur}
  //       others={others}
  //       fieldAs={fieldAs}
  //       required={required}
  //       className={className}
  //       isInValid={isInValid}
  //       onLabelClick={onLabelClick}
  //       handleChange={handleChange}
  //     />
  //   );
  // }
  return (
    <Form.Group controlId={name} className={`form-input ${className}`}>
      <Form.Label onClick={onLabelClick}>
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
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Text className="text-muted">{helper}</Form.Text>
    </Form.Group>
  );
};

// export const PasswordField = ({
//   ref,
//   name,
//   label,
//   value,
//   error,
//   helper,
//   onBlur,
//   others,
//   fieldAs,
//   required,
//   className,
//   isInValid,
//   onLabelClick,
//   handleChange,
// }) => {
//   const [type, setType] = useState("password");
//   const onToggleView = () => {
//     setType((type) => (type === "password" ? "text" : "password"));
//     ref?.current.focus();
//   };
//   return (
//     <Form.Group
//       controlId={name}
//       className={`form-input password-field ${className}`}
//     >
//       <Form.Label onClick={onLabelClick}>
//         {label} {required && "*"}
//       </Form.Label>
//       <Form.Control
//         as={fieldAs}
//         type={type}
//         isInvalid={isInValid}
//         ref={ref}
//         value={value}
//         autoComplete="off"
//         {...others}
//         onChange={handleChange}
//         onBlur={onBlur}
//         placeholder="Password"
//       />
//       <span className="password-eye" onClick={onToggleView}>
//         <SVG
//           cacheRequests={true}
//           src={
//             type === "password"
//               ? `/static/svg/visibility.svg`
//               : `/static/svg/visibility_off.svg`
//           }
//         />{" "}
//       </span>
//       <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
//       <Form.Text className="text-muted">{helper}</Form.Text>
//     </Form.Group>
//   );
// };
