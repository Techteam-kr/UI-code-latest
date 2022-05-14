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
import validator, { mobileNumber } from "./../../../utils/validator";

import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { yojanaForm } from "../../../utils/api";
import "./YojanaEnrollment.scss";

let changeDisplay;
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
  const [display, setDisplay] = useState(false);
  changeDisplay = setDisplay;
  const handleClose = () => {
    setDisplay(false);
    resetForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const onSendOtp = useCallback(() => {
    setFieldValue("mobileVerified", false);
    setFieldValue("sendOtp", false);
  }, [mobileNumber]);
  const onChangeMobile = useCallback(() => {
    setFieldValue("mobileVerified", false);
    setFieldValue("otp", "");
  }, []);
  const onVerifyOtp = useCallback(() => {
    // if (otp) {
    // }
    setFieldValue("mobileVerified", true);
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
        onClick={handleShow}
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
          {display ? (
            <div>
              You have successfully enrolled for {YojanaName} Please find
              reference id <strong>"12345678"</strong>
            </div>
          ) : (
            <FormikForm
              className="registration-form"
              noValidate
              autoComplete="off"
            >
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
                    disabled={mobileVerified}
                    required
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <Button
                    variant="primary"
                    className="verification-button primary-orange"
                    disabled={!mobileNumber || mobileVerified}
                    onClick={onSendOtp}
                    type="button"
                  >
                    Send Verification Code
                  </Button>
                  {values.mobileVerified && (
                    <Button
                      variant="primary"
                      className="change-number primary-orange"
                      onClick={onChangeMobile}
                      type="button"
                    >
                      {" "}
                      Change Mobile{" "}
                    </Button>
                  )}
                </Col>
                <Col sm={6} xs={12}>
                  <Field
                    component={TextField}
                    placeholder="Verification Code"
                    name="otp"
                    label="Verification Code"
                    disabled={mobileVerified || !sentOtp}
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
    mobileNumber: validator.mobileNumber,
    aadharNumber: Yup.string().required("Aadhar Number is Required"),
  }),
  handleSubmit: (values, { props, ...formikProps }) => {
    values["YojanaName"] = props.YojanaName;
    values["id"] = props.id;

    console.log(values, "values");
    yojanaForm(values)
      .then((res) => {
        changeDisplay(true);
      })
      .catch((err) => {});

    formikProps.resetForm();
  },
})(YojanaEnrollment);
