import { Card, Button } from "react-bootstrap";
import "./SearchApplicant.scss";
import SearchField from "react-search-field";
import { SelectField, TextField } from "../Common/FormFikComponent";
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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const SearchApplicant = ({
  values,
  updateToParent,
  setFieldValue,
  applications = [],
  pageType,
  filterChange,
  onSubmitForm,
  reSubmit,
}) => {
  const [admin, setAdmin] = useState(false);
  const [applicantsList, setApplicantsList] = useState(applications);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [applicantVal, setApplicantVal] = useState("");
  const { yojanaStatus, description } = values;
  const [enableEdit, setEnableEdit] = useState({
    applicantNumber: "",
    edit: false,
    desc: "",
  });
  const statusOption = [
    { label: "Accepted", value: "accepted" },
    { label: "Applied", value: "applied" },
    { label: "In Progress", value: "inProgress" },
    { label: "Rejected", value: "rejected" },
  ];
  useEffect(() => {
    setApplicantsList(applications);
  }, [filterChange, reSubmit]);
  useEffect(() => {
    setTimeout(() => {
      let isAdmin = window.sessionStorage.getItem("Admin");
      if (isAdmin) {
        isAdmin = JSON.parse(isAdmin);
        setAdmin(isAdmin.isAdmin);
        return fetchAllApplicant();
      }
      if (admin) {
        fetchAllApplicant();
      }
    });
  }, [admin]);
  useEffect(() => {
    fetchOnlyUserDetail();
  }, []);
  const fetchOnlyUserDetail = () => {
    let userDetails = window.sessionStorage.getItem("user");
    userDetails = JSON.parse(userDetails);
    if (userDetails && userDetails.mobileNumber) {
      searchApplicantMob({ searchValue: userDetails.mobileNumber }).then(
        (res) => {
          if (res.data.length !== 0) {
            setApplicantsList(res.data);
            setDisplayMessage(false);
          } else {
            setDisplayMessage(true);
          }
        }
      );
    }
  };
  const fetchAllApplicant = () => {
    getAllApplication().then((res) => {
      setApplicantsList(res.data);
    });
  };
  const handleEditFun = (e, applicant, index) => {
    setEnableEdit((prevState) => ({
      edit: !prevState.edit,
      applicantNumber: applicant.id,
    }));
    setFieldValue("description", applicant?.description);
    setFieldValue("yojanaStatus", applicant?.status);
    if (enableEdit.edit) {
      updateApplicantion({
        formid: applicantsList[index].id,
        status: yojanaStatus === "In Progress" ? "inProgress" : yojanaStatus,
        description: description,
      }).then((res) => {
        onSubmitHandler(applicantVal);
        pageType !== "reports" && updateToParent(Math.random());
      });
    }
  };
  const onSubmitHandler = (val) => {
    if (pageType === "reports") {
      return onSubmitForm();
    }
    setApplicantVal(val);
    setApplicantsList([]);
    if (val !== "" && val.length > 10) {
      searchApplicant({ searchValue: val }).then((res) => {
        if (res.data.length !== 0) {
          setApplicantsList(res.data);
          setDisplayMessage(false);
        } else {
          setDisplayMessage(true);
        }
      });
    } else if (val !== "") {
      searchApplicantMob({ searchValue: val }).then((res) => {
        if (res.data.length !== 0) {
          setApplicantsList(res.data);
          setDisplayMessage(false);
        } else {
          setDisplayMessage(true);
        }
      });
    } else if (val === "" && admin) {
      fetchAllApplicant();
    } else if (pageType === "my-account") {
      fetchOnlyUserDetail();
    }
  };
  return (
    <div className="search-application">
      <Card>
        {pageType !== "reports" && admin && (
          <div className="search-filter">
            <h4>Search Applicant</h4>
            <SearchField
              placeholder="Enter Applicant Id or Mobile Number"
              onEnter={onSubmitHandler}
              onSearchClick={onSubmitHandler}
              searchText=""
            />
          </div>
        )}
        {applicantsList.length > 0 ? (
          <>
            <div className="export-block container">
              <ExportToCSV
                csvData={applicantsList}
                fileName={applicantVal ? applicantVal : "applicants"}
              />
            </div>

            <Table responsive hover className="applicant-table" size="sm">
              <thead>
                <tr>
                  <th>Applicant ID</th>
                  <th>Yojana Name</th>
                  <th>Status</th>
                  {admin && <th>Action</th>}
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {applicantsList.map((applicant, index) => (
                  <tr
                    key={index}
                    className={
                      enableEdit.edit &&
                      applicant.id !== enableEdit.applicantNumber &&
                      "disable-field"
                    }
                  >
                    <td>{applicant.id}</td>
                    <td>{applicant.yojanaName}</td>
                    <td className="status-block">
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
                        <span
                          className={
                            applicant.status === "Rejected"
                              ? "reject"
                              : applicant.status === "inProgress" ||
                                applicant.status === "In Progress"
                              ? "progress"
                              : applicant.status === "Applied"
                              ? "applied"
                              : "accepted"
                          }
                        >
                          {applicant.status === "inProgress"
                            ? "In Progress"
                            : applicant.status}{" "}
                        </span>
                      )}
                    </td>
                    {admin && (
                      <td>
                        <Button
                          variant="primary"
                          className={"edit-block user-enrollment"}
                          disabled={
                            (yojanaStatus === "" &&
                              applicant.id === enableEdit.applicantNumber) ||
                            (enableEdit.edit && description === "") ||
                            (enableEdit.edit && !description)
                          }
                          onClick={(e) => handleEditFun(e, applicant, index)}
                        >
                          {enableEdit.edit &&
                          applicant.id === enableEdit.applicantNumber
                            ? "Save changes"
                            : "Edit Applicant"}
                        </Button>
                      </td>
                    )}
                    <td className="desc-status">
                      {enableEdit.edit &&
                      applicant.id === enableEdit.applicantNumber ? (
                        <FormikForm
                          noValidate
                          autoComplete="off"
                          key={applicant.id}
                        >
                          <Field
                            component={TextField}
                            placeholder="Description"
                            name="description"
                            required
                          />
                        </FormikForm>
                      ) : (
                        <>
                          <OverlayTrigger
                            key={index}
                            placement={"top"}
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {applicant?.description}.
                              </Tooltip>
                            }
                          >
                            <Button variant="secondary">
                              {applicant?.description}
                            </Button>
                          </OverlayTrigger>
                        </>
                        // <OverlayTrigger
                        //   placement="bottom"
                        //   overlay={
                        //     <Tooltip id="button-tooltip-2">
                        //       {applicant?.description}
                        //     </Tooltip>
                        //   }
                        // >
                        //   {({ ref, ...triggerHandler }) => (
                        //     <Button
                        //       variant="light"
                        //       {...triggerHandler}
                        //       className="d-inline-flex align-items-center"
                        //     >
                        //       <span className="ms-1">
                        //         {applicant?.description} Hu
                        //       </span>
                        //     </Button>
                        //   )}
                        // </OverlayTrigger>
                      )}
                    </td>
                  </tr>
                ))}
                {/* <tr>
                    <td>{applicantsList.applicantId}</td>
                    <td>{applicantsList.yojanaName}</td>
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
                        applicantsList.status
                      )}
                    </td>
                  </tr> */}
              </tbody>
            </Table>
            {/* // )} */}
          </>
        ) : (
          <p className="no-message">
            {displayMessage
              ? "Please enter proper Applicant id/Mobile number"
              : applicantsList.length === 0
              ? "No record found"
              : "Something went wrong please try after sometime"}
          </p>
        )}
      </Card>
    </div>
  );
};

// export default SearchApplicant;
export default withFormik({
  mapPropsToValues: ({ yojanaStatus = "", description = "" }) => {
    return {
      yojanaStatus,
      description,
    };
  },
  handleSubmit: (values, { props, ...formikProps }) => {},
})(SearchApplicant);
