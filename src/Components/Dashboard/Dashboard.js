import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, Row, Button, Col } from "react-bootstrap";
import "./Dashboard.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Approved", "Inprogress", "Rejected"],
  datasets: [
    {
      data: [12, 19, 3],
      fill: true,
      backgroundColor: ["#00D41C", "#FF9933", "#D90026"],
      borderColor: ["#000080", "#000080", "#000080"],
      borderWidth: 1,
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        font: {
          size: 14,
          weight: 700,
        },
      },
    },
  },
};
const setTitle = (value) => {
  return `${(
    <div>
      Total Application <br>{value}</br>
    </div>
  )}`;
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
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];
const DashboardComponent = () => {
  return (
    <div>
      {/* <Row>
        <Col xs={6}>
          <Card className="chart-block">
            <Doughnut data={data} plugins={plugins} options={options} />
          </Card>
        </Col>
        <Col xs={6}>
          <Card className="chart-block">
            <Doughnut data={data} plugins={plugins} options={options} />
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};
export default DashboardComponent;
