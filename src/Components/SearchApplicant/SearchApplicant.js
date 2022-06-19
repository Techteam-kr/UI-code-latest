import { Card } from "react-bootstrap";
import "./SearchApplicant.scss";
import SearchField from "react-search-field";
import { SelectField } from "../Common/FormFikComponent";
import { Form as FormikForm, Field, withFormik } from "formik";
import {
  searchApplicant,
  searchApplicantMob,
  updateApplicantion,
} from "../../utils/api";
import Table from "react-bootstrap/Table";
import { useState } from "react";
const SearchApplicant = ({ values, updateToParent }) => {
  const [applicantDetail, setApplicantDetail] = useState({
    applicantId: "",
    yojanaName: "",
    status: "",
  });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [applicantVal, setApplicantVal] = useState("");
  const { yojanaStatus } = values;
  const [enableEdit, setEnableEdit] = useState(false);
  const statusOption = [
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
    { label: "inProgress", value: "inProgress" },
  ];
  const handleEditFun = () => {
    updateApplicantion({
      formid: applicantDetail.applicantId,
      status: yojanaStatus,
    }).then((res) => {
      setEnableEdit((prevCheck) => !prevCheck);
      onChange(applicantVal);
      updateToParent(Math.random());
    });
  };
  const onChange = (val) => {
    setApplicantVal(val);
    setApplicantDetail({ applicantId: "", yojanaName: "", status: "" });
    if (val !== "" && val.length > 10) {
      searchApplicant({ searchValue: val }).then((res) => {
        if (res.data.length !== 0) {
          setApplicantDetail({
            applicantId: res.data[0].id,
            yojanaName: res.data[0].yojanaName,
            status: res.data[0].status,
          });
          setDisplayMessage(false);
        } else {
          setDisplayMessage(true);
        }
      });
    } else if (val !== "") {
      searchApplicantMob({ searchValue: val }).then((res) => {
        if (res.data.length !== 0) {
          setApplicantDetail({
            applicantId: res.data[0].id,
            yojanaName: res.data[0].yojanaName,
            status: res.data[0].status,
          });
          setDisplayMessage(false);
        } else {
          setDisplayMessage(true);
        }
      });
    }
  };
  return (
    <div className="search-application">
      <Card>
        <h4>Search Applicant</h4>
        <SearchField
          placeholder="Enter Applicant Id or Mobile Number"
          onEnter={onChange}
          //   onBlur={onChange}
          onSearchClick={onChange}
          searchText=""
          classNames="test-class"
        />
        {applicantDetail.applicantId ? (
          <>
            <div
              className={
                yojanaStatus === "" && enableEdit
                  ? "disable-field edit-block"
                  : "edit-block"
              }
              onClick={handleEditFun}
            >
              {enableEdit ? "Save changes" : "Edit Applicant"}
            </div>
            {window.screen.width <= 767 ? (
              <Table
                responsive
                striped
                bordered
                hover
                className="applicant-table verticle-table"
              >
                <tr>
                  <thead>
                    <th>Applicant ID</th>
                  </thead>
                  <td>{applicantDetail.applicantId}</td>
                </tr>
                <tr>
                  <thead>
                    <th>Yojana Name</th>{" "}
                  </thead>
                  <td>{applicantDetail.yojanaName}</td>
                </tr>
                <tr className="status-row">
                  <thead>
                    <th>Status</th>
                  </thead>
                  <td>
                    {enableEdit ? (
                      <>
                        <FormikForm noValidate autoComplete="off">
                          <Field
                            className="select-field"
                            component={SelectField}
                            name="yojanaStatus"
                            placeholder="Select status"
                            options={statusOption}
                            disabled={false}
                            // onChange={handleChange}
                          />
                        </FormikForm>
                      </>
                    ) : (
                      applicantDetail.status
                    )}
                  </td>
                </tr>
              </Table>
            ) : (
              <Table
                responsive
                striped
                bordered
                hover
                className="applicant-table"
              >
                <thead>
                  <tr>
                    <th>Applicant ID</th>
                    <th>Yojana Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{applicantDetail.applicantId}</td>
                    <td>{applicantDetail.yojanaName}</td>
                    <td>
                      {" "}
                      {enableEdit ? (
                        <>
                          <FormikForm noValidate autoComplete="off">
                            <Field
                              className="select-field"
                              component={SelectField}
                              name="yojanaStatus"
                              placeholder="Select status"
                              options={statusOption}
                              disabled={false}
                              // onChange={handleChange}
                            />
                          </FormikForm>
                        </>
                      ) : (
                        applicantDetail.status
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </>
        ) : (
          <p className="no-message">
            {displayMessage && "Please enter proper Applicant id/Mobile number"}
          </p>
        )}
      </Card>
    </div>
  );
};

// export default SearchApplicant;
export default withFormik({
  mapPropsToValues: ({ yojanaStatus = "" }) => {
    return {
      yojanaStatus,
    };
  },
  handleSubmit: (values, { props, ...formikProps }) => {},
})(SearchApplicant);
