import React, { useEffect, useState, useRef } from "react";
import { Form as FormikForm, Field, withFormik } from "formik";
import * as Yup from "yup";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import "./YojanaFilter.scss";
import { Button, Col, Row } from "react-bootstrap";
import { MultiSelectField, SelectField } from "../../Common/FormFikComponent";

import SVG from "react-inlinesvg";
import axios from "axios";

import SearchBoxComponent from "../../Common/SearchBoxComponent/SearchBoxComponent";
import { preventEvent } from "../../../utils/helper";
const YojanaFilterComponent = (props) => {
  const [CategoryOptions, setCategoryOptions] = useState([
    { key: "No category available", label: "No category available" },
  ]);
  const [AgeGroup, setAgeGroup] = useState([]);
  const [Gender, setGender] = useState([]);
  const multiselectRefTracker = useRef(null);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    formikProps,
    resetForm,
  } = props;
  const disablilityOption = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = () => {
    axios
      .get("http://52.88.137.206:9001/category")
      .then((res) => {
        const categories = _map(res.data?.categories, (item) => ({
          key: item,
          label: item,
        }));
        setCategoryOptions(categories);
      })
      .catch((error) => {
        console.log(error, "error");
      });
    axios.get("./data/Age.json").then((res) => {
      setAgeGroup(res.data);
    });
    axios.get("./data/Gender.json").then((res) => {
      setGender(res.data);
    });
  };

  const resetFunction = (e) => {
    resetForm();
    setCategoryOptions({ key: "Select", label: "Select" });
    axios.get("./data/Category.json").then((res) => {
      const categories = _map(res.data?.categories, (item) => ({
        key: item,
        label: item,
      }));
      setCategoryOptions(categories);
    });
    // multiselectRefTracker.current.resetSelectedValues();
    // console.log(values, "values", ref);
    // setCategoryOptions([]);
  };

  return (
    <div className="filter-block">
      <h3>JANA YOJANA</h3>
      <div className="div-formik">
        <FormikForm noValidate autoComplete="off">
          <Row>
            <Col
              sm={
                window.innerWidth > 1280
                  ? "3"
                  : window.innerWidth <= 1280 && window.innerWidth > 767
                  ? "3"
                  : window.innerWidth < 767 && "12"
              }
            >
              <Field
                className="multi-select-field"
                label="1.Select Category"
                placeholder="Select one or more Category"
                component={MultiSelectField}
                name="category"
                options={CategoryOptions}
                ref={multiselectRefTracker}
              />
            </Col>
            <Col
              sm={
                window.innerWidth > 1280
                  ? "3"
                  : window.innerWidth <= 1280 && window.innerWidth > 767
                  ? "3"
                  : window.innerWidth < 767 && "12"
              }
            >
              <Field
                className="select-field"
                component={SelectField}
                name="age"
                label="2.Select Age"
                placeholder="Select Age"
                options={AgeGroup.ageList}
                disabled={false}
              />
            </Col>
            <Col
              sm={
                window.innerWidth > 1280
                  ? "3"
                  : window.innerWidth <= 1280 && window.innerWidth > 767
                  ? "3"
                  : window.innerWidth < 767 && "12"
              }
            >
              <Field
                className="select-field"
                component={SelectField}
                name="gender"
                label="3.Select Gender"
                placeholder="Select Gender"
                options={Gender}
                disabled={false}
              />
            </Col>
            <Col
              sm={
                window.innerWidth > 1280
                  ? "3"
                  : window.innerWidth <= 1280 && window.innerWidth > 767
                  ? "3"
                  : window.innerWidth < 767 && "12"
              }
            >
              <Field
                className="select-field"
                component={SelectField}
                name="disablility"
                label="4.Is There Disablility"
                placeholder="Select"
                options={disablilityOption}
                disabled={false}
              />
            </Col>
          </Row>
          <div className="action-field">
            <Button className="primary-orange" type="submit">
              Apply Filter{" "}
              <SVG
                cacheRequests={true}
                src={`/static/svg/filter_alt_black_24dp.svg`}
              />
            </Button>

            <Button
              className="primary-orange"
              type="button"
              onClick={(e) => resetFunction(e)}
            >
              Reset Filter{" "}
              <SVG
                cacheRequests={true}
                src={`/static/svg/restart_alt_black_24dp.svg`}
              />
            </Button>
          </div>
        </FormikForm>
        <SearchBoxComponent />
      </div>
    </div>
  );
};
export default withFormik({
  mapPropsToValues: ({
    category = [],
    age = "",
    gender = "",
    disablility = "",
  }) => {
    return {
      category,
      age,
      gender,
      disablility,
    };
  },

  handleSubmit: (values, { props, ...formikProps }) => {
    const { age } = values;
    let value = age.split("-");
    let ageLowerLimit = value[0];
    let ageHigherLimit = value[1];
    let filterRequest = values;
    filterRequest.ageLowerLimit = value[0];
    filterRequest.ageHigherLimit = value[1];
    axios
      .post("http://localhost:9000/filteredYojanas", filterRequest)
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  },
})(YojanaFilterComponent);
