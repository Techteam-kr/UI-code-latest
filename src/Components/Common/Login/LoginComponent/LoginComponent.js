import React, { useState, useCallback, useEffect } from "react";
import { Form as FormikForm, Field, withFormik } from "formik";
import { TextField } from "../../FormFikComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SVG from "react-inlinesvg";
import Modal from "react-bootstrap/Modal";
import { fetchOtp, verifyOtp } from "../../../../utils/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import validator from "../../../../utils/validator";
import "./LoginComponent.scss";
let setLoggedIn;
let navigator;
const LoginComponent = ({ values, setFieldValue, admin }) => {
  navigator = useNavigate();
  const { mobileNumber, otp, sentOtp, mobileVerified } = values;
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAs, setloggedInAs] = useState("");
  const varifyMobileNumber = (value) => {};
  setLoggedIn = setIsLoggedIn;
  const handleClose = () => {
    setFieldValue("mobileNumber", "");
    setFieldValue("otp", "");
    setFieldValue("sentOtp", false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    setTimeout(() => {
      let userDetails = window.sessionStorage.getItem("user");
      let adminDetails = window.sessionStorage.getItem("Admin");
      let userResult = JSON.parse(userDetails);
      let adminResult = JSON.parse(adminDetails);
      if (userResult?.name || adminResult?.isAdmin) {
        setIsLoggedIn(true);
        setloggedInAs(
          adminResult?.isAdmin
            ? "Admin"
            : userResult.name !== ""
            ? userResult.name
            : userResult?.mobileNumber
        );
      } else {
        window.sessionStorage.clear();
      }
    }, 100);
  }, [admin, isLoggedIn]);
  const onSendOtp = useCallback(() => {
    fetchOtp({ mobno: mobileNumber })
      .then((res) => {
        setFieldValue("sentOtp", true);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [mobileNumber]);
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.sessionStorage.clear();
    setFieldValue("mobileNumber", "");
    setFieldValue("otp", "");
    navigator("/");
    window.location.reload();
  };
  return (
    <div className="login-block">
      {console.log(isLoggedIn, "isLoggedIn")}
      {isLoggedIn ? (
        <nav className="login-header">
          <ul className="list-n">
            <li>
              {window.screen.width > 767 && <i>logged in as:</i>}{" "}
              <span>{loggedInAs}</span>
            </li>
            <li onClick={handleLogout}>
              {" "}
              <span className="logout-link">
                {" "}
                {window.screen.width > 767 && "logout"}
                <SVG cacheRequests={true} src={`/static/svg/logout.svg`} />{" "}
              </span>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <Button className="primary-orange login-link" onClick={handleShow}>
            <SVG cacheRequests={true} src={`/static/svg/login.svg`} />{" "}
            {window.screen.width > 767 && "Login"}
          </Button>
          <Modal className="login-modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login with your mobile number</Modal.Title>
            </Modal.Header>
            <FormikForm className="registration-form" autoComplete="off">
              <Modal.Body>
                <Row>
                  <Col xs={12}>
                    <Field
                      component={TextField}
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      label="Mobile Number"
                      disabled={sentOtp}
                      onBlur={varifyMobileNumber}
                      required
                      autoFocus
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Button
                      variant="primary"
                      className="verification-button primary-orange"
                      disabled={mobileNumber.length < 10 || sentOtp}
                      onClick={onSendOtp}
                      type="button"
                    >
                      Send OTP
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Field
                      component={TextField}
                      placeholder="OTP"
                      name="otp"
                      label="OTP"
                      disabled={!sentOtp || mobileVerified}
                      //   onBlur={onVerifyOtp}
                      required
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="primary-orange"
                  variant="primary"
                  type="submit"
                  disabled={!sentOtp || otp.length < 4}
                >
                  Login
                </Button>
              </Modal.Footer>
            </FormikForm>
          </Modal>
        </>
      )}
    </div>
  );
};
export default withFormik({
  mapPropsToValues: ({ mobileNumber = "", otp = "" }) => {
    return {
      mobileNumber,
      otp,
    };
  },
  validationSchema: Yup.object().shape({
    mobileNumber: validator.mobileNumberValidation,
  }),
  handleSubmit: (values, { props, ...formikProps }) => {
    verifyOtp({ mobno: values.mobileNumber, otp: values.otp })
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          var user = { name: res.data.name, mobileNumber: values.mobileNumber };
          window.sessionStorage.setItem("user", JSON.stringify(user));
          var obj = JSON.parse(sessionStorage.user);
          navigator("/");
          //   setFieldValue("mobileVerified", true);
        } else {
          alert("Invalid OTP");
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  },
})(LoginComponent);
