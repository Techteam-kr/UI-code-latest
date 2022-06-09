import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SelectField } from "../Common/FormFikComponent";
import { getMinistryList, fetchYojanaNames } from "../../utils/api";
import { Card, Row, Button, Col } from "react-bootstrap";
import _map from "lodash/map";
import { Form as FormikForm, Field, withFormik } from "formik";

import "./Dashboard.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Approved", "Inprogress", "Rejected"],
  datasets: [
    {
      data: [12, 19, 3],
      fill: true,
      backgroundColor: ["#00D41C", "#FF9933", "#D90026"],
      borderColor: [
        "rgb(0, 212, 28, 0.8)",
        "rgb(255, 153, 51, 0.8)",
        "rgb(217, 0, 38, 0.8)",
      ],
      // borderWidth: [20, 20, 20],
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: 14,
          weight: 700,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  },
};
const setTitle = (value) => {
  return value;
};
const plugins = [
  {
    beforeDraw: function (chart) {
      var width = chart.width - 140,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var text = setTitle("1300"),
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.beginPath();
      ctx.arc(textX + 55, textY, 90, 0, 2 * Math.PI);
      ctx.fillStyle = "#000080";
      ctx.fill();
      ctx.lineWidth = 30;
      ctx.strokeStyle = "rgba(255, 255, 255, .9)";
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, textX, textY - 20);
      ctx.save();
    },
  },
];
const DashboardComponent = () => {
  const [ministryList, setMinistryList] = useState([]);
  const [yojanaNames, setYojanaNames] = useState([]);

  useEffect(() => {
    getMinistryList().then((res) => {
      setMinistryList(res.data);
    });
    getYojanaNamesList();
  }, []);

  const getYojanaNamesList = () => {
    fetchYojanaNames().then((res) => {
      const yojanas = _map(res.data?.names, (item, index) => ({
        value: index,
        label: item,
      }));
      setYojanaNames(yojanas);
    });
  };

  return (
    <div className="div-formik">
      {/* <FormikForm noValidate autoComplete="off">
        <Row>
          <Col xs={6}>
            <Card className="chart-block">
              <div className="chart-header">
                <Field
                  className="select-field"
                  component={SelectField}
                  name="ministry"
                  label="Select Ministry"
                  placeholder="Select Ministry"
                  options={ministryList.ministryList}
                  disabled={false}
                />
              </div>
              <div className="pie-chart-block">
                <Doughnut data={data} plugins={plugins} options={options} />
              </div>
            </Card>
          </Col>
          <Col xs={6}>
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
                />
              </div>
              <div className="pie-chart-block">
                <Doughnut data={data} plugins={plugins} options={options} />
              </div>
            </Card>
          </Col>
        </Row>
      </FormikForm> */}
    </div>
  );
};
export default withFormik({
  handleSubmit: (values, { props, ...formikProps }) => {},
})(DashboardComponent);
