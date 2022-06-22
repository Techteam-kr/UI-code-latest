import { Card, Button } from "react-bootstrap";
import "./SearchApplicant.scss";
import SearchField from "react-search-field";
import { SelectField } from "../Common/FormFikComponent";
import { Form as FormikForm, Field, withFormik } from "formik";
import {
  searchApplicant,
  searchApplicantMob,
  updateApplicantion,
  getAllApplication,
} from "../../utils/api";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import ExportToCSV from "../Common/ExcelDownloadComponent/ExportToCSV";
const SearchApplicant = ({ values, updateToParent }) => {
  const [applicantDetail, setApplicantDetail] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [applicantVal, setApplicantVal] = useState("");
  const { yojanaStatus } = values;
  const [enableEdit, setEnableEdit] = useState({
    applicantNumber: "",
    edit: false,
  });
  const statusOption = [
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
    { label: "inProgress", value: "inProgress" },
  ];
  useEffect(() => {
    fetchAllApplicant();
  }, []);
  const fetchAllApplicant = () => {
    getAllApplication().then((res) => {
      setApplicantDetail(res.data);
    });
  };
  const handleEditFun = (e, applicant, index) => {
    setEnableEdit((prevState) => ({
      edit: !prevState.edit,
      applicantNumber: applicant,
    }));
    if (enableEdit.edit) {
      updateApplicantion({
        formid: applicantDetail[index].id,
        status: yojanaStatus,
      }).then((res) => {
        onSubmitHandler(applicantVal);
        updateToParent(Math.random());
      });
    }
  };
  const onSubmitHandler = (val) => {
    setApplicantVal(val);
    setApplicantDetail([]);
    if (val !== "" && val.length > 10) {
      searchApplicant({ searchValue: val }).then((res) => {
        if (res.data.length !== 0) {
          setApplicantDetail(res.data);
          setDisplayMessage(false);
        } else {
          setDisplayMessage(true);
        }
      });
    } else if (val !== "") {
      searchApplicantMob({ searchValue: val }).then((res) => {
        if (res.data.length !== 0) {
          setApplicantDetail(res.data);
          setDisplayMessage(false);
        } else {
          setDisplayMessage(true);
        }
      });
    } else if (val === "") {
      fetchAllApplicant();
    }
  };
  return (
    <div className="search-application">
      <Card>
        <h4>Search Applicant</h4>
        <SearchField
          placeholder="Enter Applicant Id or Mobile Number"
          onEnter={onSubmitHandler}
          onSearchClick={onSubmitHandler}
          searchText=""
        />
        {applicantDetail.length > 0 ? (
          <>
            <div className="export-block container">
              <ExportToCSV
                csvData={applicantDetail}
                fileName={applicantVal ? applicantVal : "applicants"}
              />
            </div>

            <Table
              responsive
              striped
              bordered
              hover
              className="applicant-table"
              size="sm"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applicant ID</th>
                  <th>Yojana Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicantDetail.map((applicant, index) => (
                  <tr
                    key={index}
                    className={
                      enableEdit.edit &&
                      applicant.id !== enableEdit.applicantNumber &&
                      "disable-field"
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{applicant.id}</td>
                    <td>{applicant.yojanaName}</td>
                    <td>
                      {" "}
                      {enableEdit.edit &&
                      applicant.id === enableEdit.applicantNumber ? (
                        <FormikForm
                          noValidate
                          autoComplete="off"
                          key={applicant.id}
                        >
                          <Field
                            className="select-field"
                            component={SelectField}
                            name="yojanaStatus"
                            placeholder="Select status"
                            options={statusOption}
                            disabled={false}
                            // onSubmitHandler={handleChange}
                          />
                        </FormikForm>
                      ) : (
                        applicant.status
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        className={"edit-block user-enrollment"}
                        disabled={
                          yojanaStatus === "" &&
                          applicant.id === enableEdit.applicantNumber
                        }
                        onClick={(e) => handleEditFun(e, applicant.id, index)}
                      >
                        {enableEdit.edit &&
                        applicant.id === enableEdit.applicantNumber
                          ? "Save changes"
                          : "Edit Applicant"}
                      </Button>
                    </td>
                  </tr>
                ))}
                {/* <tr>
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
                              // onSubmitHandler={handleChange}
                            />
                          </FormikForm>
                        </>
                      ) : (
                        applicantDetail.status
                      )}
                    </td>
                  </tr> */}
              </tbody>
            </Table>
            {/* // )} */}
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
