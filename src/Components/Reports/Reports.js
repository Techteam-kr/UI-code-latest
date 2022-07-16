import React, { useEffect, useState } from "react";
import { SelectField, TextField } from "../Common/FormFikComponent";
import { Form as FormikForm, Field, withFormik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { fetchYojanaNames, searchForms } from "../../utils/api";
import _map from "lodash/map";
import SVG from "react-inlinesvg";
import Card from "react-bootstrap/Card";

import "./Reports.scss";
import SearchApplicant from "../SearchApplicant/SearchApplicant";
let yojanaApplications;
let changeFilter;
let reSubmitHandler;
const ReportComponent = ({ resetForm, handleSubmit }) => {
  const [yojanaNames, setYojanaNames] = useState([]);
  const [reports, setReports] = useState([]);
  const [reSubmit, setReSubmit] = useState(false);
  const [changeInFilter, setChangeInFilter] = useState(false);
  changeFilter = setChangeInFilter;
  yojanaApplications = setReports;
  reSubmitHandler = setReSubmit;
  const statusOption = [
    { label: "Accepted", value: "accepted" },
    { label: "Applied", value: "applied" },
    { label: "In Progress", value: "inProgress" },
    { label: "Rejected", value: "rejected" },
  ];
  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = () => {
    fetchYojanaNames().then((res) => {
      const yojanas = _map(res.data?.names, (item, index) => ({
        value: index,
        label: item,
      }));
      setYojanaNames(yojanas);
    });
  };
  const onSubmitHandler = () => {
    handleSubmit();
  };
  const resetFunction = (e) => {
    resetForm();
  };
  return (
    <Card className="report-card" body>
      <h3>JANA YOJANA REPORTS</h3>
      <div className="report-search-block">
        <FormikForm noValidate autoComplete="off">
          <Row>
            {" "}
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
                name="yojana"
                label="1. Select Yojana"
                placeholder="All Yojana"
                options={yojanaNames}
                disabled={false}
              />
            </Col>{" "}
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
                name="status"
                label="2. Select Status"
                placeholder="All Status"
                options={statusOption}
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
                component={TextField}
                placeholder="Enter Applicant Id or Mobile Number"
                name="identifierfield"
                label="Search Applicant"
              />
            </Col>
          </Row>
          <Row>
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
          </Row>
        </FormikForm>
      </div>
      <SearchApplicant
        applications={reports}
        pageType={"reports"}
        filterChange={changeInFilter}
        onSubmitForm={onSubmitHandler}
        reSubmit={reSubmit}
      />
    </Card>
  );
};
export default withFormik({
  mapPropsToValues: ({ yojana = "", status = "", identifierfield = "" }) => {
    return {
      yojana,
      status,
      identifierfield,
    };
  },
  handleSubmit: (values, { props, ...formikProps }) => {
    searchForms({
      yojanaName: values.yojana === "" ? "All" : values.yojana,
      applicationStatus: values.status === "" ? "All" : values.status,
      identifierfield:
        values.identifierfield === "" ? "All" : values.identifierfield,
    })
      .then((res) => {
        yojanaApplications(res.data);
        changeFilter(values);
        reSubmitHandler(true);
      })
      .catch((err) => {
        console.log(err, "err");
      });
    reSubmitHandler(false);
  },
})(ReportComponent);
