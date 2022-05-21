import React, { useEffect, useState, useRef } from "react";
import { Form as FormikForm, Field, withFormik } from "formik";
import _map from "lodash/map";
import "./YojanaFilter.scss";
import { Button, Col, Row } from "react-bootstrap";
import { MultiSelectField, SelectField } from "../../Common/FormFikComponent";
import { getAgeTypes, getCategory, getGenderTypes } from "../../../utils/api";
import SVG from "react-inlinesvg";
import SearchBoxComponent from "../../Common/SearchBoxComponent/SearchBoxComponent";
const YojanaFilterComponent = (props) => {
  const [CategoryOptions, setCategoryOptions] = useState([]);
  const [AgeGroup, setAgeGroup] = useState([]);
  const [Gender, setGender] = useState([]);
  const multiselectRefTracker = useRef(null);
  const { resetForm } = props;
  const disablilityOption = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = () => {
    getCategory()
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
    getAgeTypes().then((res) => {
      setAgeGroup(res.data);
    });
    getGenderTypes().then((res) => {
      setGender(res.data);
    });
  };

  const resetFunction = (e) => {
    resetForm();
    setCategoryOptions({ key: "Select", label: "Select" });
    getCategory().then((res) => {
      const categories = _map(res.data?.categories, (item) => ({
        key: item,
        label: item,
      }));
      setCategoryOptions(categories);
    });
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
                name="categories"
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
                name="disability"
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
    categories = [],
    age = "",
    gender = "",
    disability = "",
  }) => {
    return {
      categories,
      age,
      gender,
      disability,
    };
  },

  handleSubmit: (values, { props, ...formikProps }) => {
    const { age } = values;
    let value = age.split("-");
    let ageLowerLimit = value[0] === "Above 60" ? "60" : value[0];
    let ageHigherLimit = !value[1] ? "130" : value[1];
    let filterRequest = values;
    filterRequest.ageLowerLimit = ageLowerLimit;
    filterRequest.ageHigherLimit = ageHigherLimit;
    let allEmpty = Object.keys(filterRequest).every((key) => {
      return filterRequest[key].length === 0 || filterRequest[key] === "";
    });
    if (allEmpty) {
      filterRequest.categories = [
        "Housing",
        "Pension",
        "Women & Children",
        "BPL",
      ];
    }
    props.getDefaultYojana(filterRequest);
  },
})(YojanaFilterComponent);
