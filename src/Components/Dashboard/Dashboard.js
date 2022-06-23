import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SelectField } from "../Common/FormFikComponent";
import {
  getMinistryList,
  fetchYojanaNames,
  dashboardStatus,
} from "../../utils/api";
import { Card, Row, Button, Col } from "react-bootstrap";
import _map from "lodash/map";
import { Form as FormikForm, Field, withFormik } from "formik";

import "./Dashboard.scss";
import SearchApplicant from "../SearchApplicant/SearchApplicant";
ChartJS.register(ArcElement, Tooltip, Legend);
const screenWidth = window.screen.width;
export const data = {
  labels: ["Applied", "Accepted", "In Progress", "Rejected"],
  datasets: [
    {
      data: [0, 0, 0, 0],
      fill: true,
      backgroundColor: ["#3a8719", "#00D41C", "#FF9933", "#D90026"],
      // borderColor: [
      //   "rgb(58, 135, 25, 0.8)",
      //   "rgb(0, 212, 28, 0.8)",
      //   "rgb(255, 153, 51, 0.8)",
      //   "rgb(217, 0, 38, 0.8)",
      // ],
      borderColor: ["#000000"],
      borderWidth: [2, 2, 2, 2],
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: screenWidth < 767 ? "bottom" : "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: screenWidth < 1024 ? 14 : 20,
          weight: 700,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    doughnutBackground: {
      enabled: true,
      color: "#E4E6E6",
    },
  },
};
const setTitle = (value) => {
  return value;
};
const setArc = (textX, textY) => {
  if (screenWidth <= 767) {
    return;
  }
};
const name = "Pradhan Mantri Awas Yojana";

const DashboardComponent = ({ setFieldValue }) => {
  const [ministryList, setMinistryList] = useState([]);
  const [yojanaNames, setYojanaNames] = useState([]);
  const [formTotalCount, setFormTotalCount] = useState(0);
  const [statusReponse, setStatusResponse] = useState({});
  const [stateUpdate, setStateUpdate] = useState(Math.random());
  const [pluginConfig, setPluginConfig] = useState([
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = "",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY =
            screenWidth >= 1280
              ? height / 2
              : screenWidth >= 320 && screenWidth <= 1024
              ? height / 2.6
              : height / 2;
        ctx.beginPath();
        if (screenWidth >= 1440) {
          ctx.arc(textX - 0, textY, 220, 0, 2 * Math.PI);
        } else if (screenWidth >= 1280 && screenWidth < 1440) {
          ctx.arc(textX - 0, textY, 200, 0, 2 * Math.PI);
        } else if (screenWidth >= 320 && screenWidth <= 1024) {
          ctx.arc(textX, textY, 60, 0, 2 * Math.PI);
        }
        ctx.fillStyle = "#000080";
        ctx.fill();
        ctx.lineWidth = 22;
        ctx.strokeStyle = "rgb(0, 0, 128, .8)";
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(text, textX - width / 10, textY - width / 20);
        ctx.save();
      },
    },
  ]);
  const [donutConfig, setdoNutConfig] = useState({
    labels: ["Applied", "Accepted", "In Progress", "Rejected"],
    datasets: [
      {
        data: [12, 19, 3, 1],
        fill: true,
        backgroundColor: ["#3a8719", "#00D41C", "#FF9933", "#D90026"],
        borderColor: ["#000000"],
        borderWidth: [2, 2, 2, 2],
      },
    ],
  });
  useEffect(() => {
    getMinistryList().then((res) => {
      setMinistryList(res.data);
    });

    // dashBoardCall(name);
    getYojanaNamesList();
  }, []);
  useEffect(() => {
    dashBoardCall(name);
  }, [stateUpdate]);
  const dashBoardCall = (name) => {
    dashboardStatus({ yojanaName: name }).then((res) => {
      setStatusResponse(res.data);
      let values = [];
      let doNutLabels = [];
      Object.keys(res.data).forEach((key) => {
        let label = key[0].toUpperCase() + key.slice(1);
        key !== "total" && values.push(res.data[key]);
        key !== "total" && doNutLabels.push(label);
        if (key === "total") {
          setFormTotalCount(res.data[key]);
          // updateTotalConfig(res.data[key]);
        }
      });
      setdoNutConfig({
        labels: doNutLabels,
        datasets: [
          {
            data: values,
            fill: true,
            backgroundColor: ["#00D41C", "#FF9933", "#D90026", "#3a8719"],
            borderColor: ["#000000"],
            borderWidth: [2, 2, 2, 2],
          },
        ],
      });
    });
  };
  const getYojanaNamesList = () => {
    fetchYojanaNames().then((res) => {
      const yojanas = _map(res.data?.names, (item, index) => ({
        value: index,
        label: item,
      }));
      setYojanaNames(yojanas);
    });
  };
  const handleChange = (e) => {
    dashBoardCall(e.target.value);
    setFieldValue("yojana", e.target.value);
  };
  return (
    <div className="div-formik">
      <FormikForm noValidate autoComplete="off">
        <Card className="chart-block">
          <div className="chart-header">
            <Field
              className="select-field"
              component={SelectField}
              name="yojana"
              label="Select Yojana"
              placeholder="Select Yojana"
              options={yojanaNames}
              disabled={false}
              onChange={handleChange}
            />
          </div>
          <div className="pie-chart-block">
            <Row>
              <Col sm={6} xs={12} className="chart-layout">
                <Doughnut
                  data={donutConfig}
                  plugins={pluginConfig}
                  options={options}
                />
                <div className="total-label">
                  <div className="">Total applicants</div>
                  <div>{formTotalCount}</div>
                </div>
              </Col>
              <Col sm={6} xs={12} className="status-board">
                <div className="detail-label">
                  <Row>
                    <Col xs={6}>
                      <div>Applied</div>
                      <div className="applied-label">
                        {statusReponse.Applied}
                      </div>
                    </Col>

                    <Col xs={6}>
                      <div>In Progress</div>
                      <div className="inprogress-label">
                        {statusReponse.inProgress}
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div>Rejected</div>
                      <div className="rejected-label">
                        {statusReponse.Rejected}
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div>Accepted</div>
                      <div className="approved-label">
                        {statusReponse.Accepted}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        {/* </Row> */}
      </FormikForm>

      <SearchApplicant updateToParent={setStateUpdate} />
    </div>
  );
};
export default withFormik({
  mapPropsToValues: ({
    yojana = "Pradhan Mantri Awas Yojana",
    ministry = "",
  }) => {
    return {
      yojana,
      ministry,
    };
  },
  handleSubmit: (values, { props, ...formikProps }) => {},
})(DashboardComponent);

// const Dashboard = () => {
//   return <h1>Dashboard</h1>;
// };
// export default Dashboard;
