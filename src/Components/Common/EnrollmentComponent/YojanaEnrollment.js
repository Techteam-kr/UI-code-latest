import react, { useEffect, useState, useCallback } from "react";
import _map from "lodash/map";
import _lower from "lodash/lowerCase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Form as FormikForm, Field, withFormik } from "formik";
import { TextField, SelectField } from "../FormFikComponent";
import {
  getGenderTypes,
  getMartialStatus,
  getReligionType,
} from "../../../utils/api";
import validator, { mobileNumberValidation } from "./../../../utils/validator";

import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { yojanaForm, fetchOtp, verifyOtp } from "../../../utils/api";
import "./YojanaEnrollment.scss";

let changeDisplay;
let successMessageRes;
const YojanaEnrollment = ({
  YojanaName,
  id,
  values,
  setFieldValue,
  resetForm,
}) => {
  const { mobileVerified, mobileNumber, otp, sentOtp } = values;
  const [show, setShow] = useState(false);
  const [Gender, setGender] = useState([]);
  const [MartialStatus, setMartialStatus] = useState([]);
  const [Religion, setReligion] = useState([]);
  const [displaySuccessMessage, setDisplay] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  successMessageRes = setSuccessMessage;
  changeDisplay = setDisplay;
  const handleClose = () => {
    setDisplay(false);
    resetForm();
    setShow(false);
  };
  const handleShow = (e, name) => {
    if (name === "Pradhan Mantri Awas Yojana") {
      setShow(true);
    }
  };
  const onSendOtp = useCallback(() => {
    fetchOtp({ mobno: mobileNumber })
      .then((res) => {
        setFieldValue("sentOtp", true);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [mobileNumber]);
  const onChangeMobile = useCallback(() => {
    setFieldValue("mobileVerified", false);
    setFieldValue("otp", "");
  }, []);
  const varifyMobileNumber = (value) => {};
  const onVerifyOtp = useCallback(() => {
    if (otp) {
      verifyOtp({ mobno: mobileNumber, otp: otp })
        .then((res) => {
          if (res.data) {
            setFieldValue("mobileVerified", true);
          } else {
            alert("Invalid OTP");
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  }, [mobileNumber, otp]);
  useEffect(() => {
    getGenderTypes().then((res) => {
      setGender(res.data);
    });
    getMartialStatus().then((res) => {
      setMartialStatus(res.data);
    });
    getReligionType().then((res) => {
      setReligion(res.data);
    });
  }, []);
  return (
    <>
      <Button
        variant="primary"
        className="user-enrollment"
        onClick={(e) => handleShow(e, YojanaName)}
      >
        User Enrollment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{YojanaName} Enrollment Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {displaySuccessMessage ? (
            <div>{successMessage}</div>
          ) : (
            <FormikForm className="registration-form" autoComplete="off">
              <Card className="">
                <Card.Header className="">Applicant details</Card.Header>
              </Card>
              <Row>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Ward Number"
                    name="wardNumber"
                    label="Ward Number"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Full Name"
                    name="fullName"
                    label="Full Name as per Aadhar card"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Father Name/Husband Name/Gaurdian Name"
                    name="gaurdianName"
                    label="Father or Husband or Gaurdian Name"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    className="select-field"
                    component={SelectField}
                    name="gender"
                    label="Select Gender"
                    placeholder="Select Gender"
                    options={Gender}
                    disabled={false}
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Age"
                    name="age"
                    label="Age"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Caste"
                    name="caste"
                    label="Caste"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    className="select-field"
                    component={SelectField}
                    name="martialStatus"
                    label="Select Martial states"
                    placeholder="Select Martial states"
                    options={MartialStatus}
                    disabled={false}
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    className="select-field"
                    component={SelectField}
                    name="religion"
                    label="Select Religion"
                    placeholder="Select Religion"
                    options={Religion}
                    disabled={false}
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    className="select-field"
                    component={TextField}
                    name="otherReligion"
                    label="Specify Religion"
                    placeholder="Specify Religion"
                    disabled={values.religion !== "Other"}
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Bank Account Number"
                    name="accountNumber"
                    label="Bank Account Number"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Bank Name"
                    name="bankName"
                    label="Bank Name"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Branch Name"
                    name="branchName"
                    label="Branch Name"
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="IFSC Code"
                    name="ifscCode"
                    label="IFSC Code"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Monthly Income"
                    name="income"
                    label="Monthly Income"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="BPL Card Number"
                    name="bplNumber"
                    label="BPL Card Number"
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Address Line 1"
                    name="addressLineOne"
                    label="Address Line 1"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Address Line 2"
                    name="addressLineTwo"
                    label="Address Line 2"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Pincode"
                    name="pincode"
                    label="Pincode"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Aadhar Number"
                    name="aadharNumber"
                    label="Aadhar Number"
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    label="Mobile Number"
                    disabled={sentOtp}
                    onBlur={varifyMobileNumber}
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Button
                    variant="primary"
                    className="verification-button primary-orange"
                    disabled={mobileNumber.length < 10 || sentOtp}
                    onClick={onSendOtp}
                    type="button"
                  >
                    Send Verification Code
                  </Button>
                  {/* {values.mobileVerified && (
                    <Button
                      variant="primary"
                      className="change-number primary-orange"
                      onClick={onChangeMobile}
                      type="button"
                    >
                      {" "}
                      Change Mobile{" "}
                    </Button>
                  )} */}
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Verification Code"
                    name="otp"
                    label="Verification Code"
                    disabled={!sentOtp || mobileVerified}
                    onBlur={onVerifyOtp}
                    required
                  />
                </Col>
              </Row>
              <div className="action-block">
                <Button
                  className="close-form"
                  onClick={handleClose}
                  variant="secondary"
                >
                  Close
                </Button>{" "}
                <Button
                  className="primary-orange"
                  variant="primary"
                  type="submit"
                  disabled={!mobileVerified}
                >
                  Enroll this Yojana
                </Button>
              </div>
            </FormikForm>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default withFormik({
  mapPropsToValues: ({
    wardNumber = "",
    fullName = "",
    gaurdianName = "",
    gender = "",
    age = "",
    caste = "",
    martialStatus = "",
    religion = "",
    otherReligion = "",
    accountNumber = "",
    bankName = "",
    branchName = "",
    ifscCode = "",
    income = "",
    bplNumber = "",
    addressLineOne = "",
    addressLineTwo = "",
    pincode = "",
    mobileNumber = "",
    aadharNumber = "",
    yojananName = "",
  }) => {
    return {
      wardNumber,
      fullName,
      gaurdianName,
      gender,
      age,
      caste,
      martialStatus,
      religion,
      otherReligion,
      accountNumber,
      bankName,
      branchName,
      ifscCode,
      income,
      bplNumber,
      addressLineOne,
      addressLineTwo,
      mobileNumber,
      mobileVerified: false,
      sentOtp: false,
      aadharNumber,
      pincode,
    };
  },
  validationSchema: Yup.object().shape({
    wardNumber: Yup.string().required("Ward Number Required"),
    fullName: Yup.string().required("Name Required"),
    gaurdianName: Yup.string().required("Gaurdian Name Required"),
    gender: Yup.string().required("Gender is Required"),
    age: validator.requiredNumber,
    caste: Yup.string().required("Caste is Required"),
    religion: Yup.string().required("Religion is Required"),
    accountNumber: Yup.string().required("Account Number is Required"),
    bankName: Yup.string().required("Bank Name is Required"),
    ifscCode: Yup.string().required("IFSC Code is Required"),
    income: validator.number,
    addressLineOne: Yup.string().required("Address is Required"),
    addressLineTwo: Yup.string().required("Address is Required"),
    pincode: validator.number,
    mobileNumber: validator.mobileNumberValidation,
    aadharNumber: Yup.string().required("Aadhar Number is Required"),
  }),
  handleSubmit: (values, { props, ...formikProps }) => {
    values["yojanaName"] = props.YojanaName;
    values["id"] = props.id;
    yojanaForm(values)
      .then((res) => {
        changeDisplay(true);
        successMessageRes(res.data);
      })
      .catch((err) => {});

    formikProps.resetForm();
  },
})(YojanaEnrollment);
