import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./AdminLoginComponent.scss";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Form as FormikForm, Field, withFormik } from "formik";
import { TextField } from "../../FormFikComponent";
import { PasswordField } from "../../FormFikComponent/PasswordField";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { adminlogin } from "../../../../utils/api";
let navigate;
const AdminLoginComponent = ({ values, setAdmin }) => {
  navigate = useNavigate();
  const [show, setShow] = useState(true);
  useEffect(() => {
    window.sessionStorage.clear();
  }, []);
  const handleClose = () => {
    setShow(false);
    navigate("/", {
      // search: `?${yojana.id}`,
      // state: { yojanaId: yojana.id, title: yojana.name },
    });
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="admin-login-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Please enter Username and Password</Modal.Title>
        </Modal.Header>
        <FormikForm className="admin-login-form" autoComplete="off">
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <Field
                  component={TextField}
                  placeholder="Username"
                  name="username"
                  label="Username"
                  required
                  autoFocus
                />
              </Col>
              <Col xs={12}>
                <Field
                  component={PasswordField}
                  placeholder="Password"
                  name="password"
                  label="Password"
                  required
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="primary-orange" variant="primary" type="submit">
              Login
            </Button>
          </Modal.Footer>
        </FormikForm>
      </Modal>
    </>
  );
};
export default withFormik({
  mapPropsToValues: ({ username = "", password = "" }) => {
    return {
      username,
      password,
    };
  },
  validationSchema: Yup.object().shape({
    username: "",
    password: "",
  }),
  handleSubmit: (values, { props, ...formikProps }) => {
    adminlogin(values)
      .then((res) => {
        if (res.data.user !== "null") {
          navigate("/dashboard", {});
          var user = { isAdmin: true };
          window.sessionStorage.setItem("Admin", JSON.stringify(user));
          props.setAdmin(true);
        } else {
          alert("Admin login failed");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  },
})(AdminLoginComponent);
