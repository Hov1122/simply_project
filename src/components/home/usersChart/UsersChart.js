import React from "react";
import Chart from "react-apexcharts";
import './UsersChart.css'

const UsersChart = ({ data }) => {
  console.log(data);

  return (
    <div className="users-online-charts">
        <Chart
        type="radialBar"
        width="380"
        options={{
          plotOptions: {
            radialBar: {
              size: undefined,
              inverseOrder: false,
              startAngle: 0,
              endAngle: 275,
              offsetX: 0,
              offsetY: 0,
              hollow: {
                margin: 5,
                size: "50%",
                background: "transparent",
                image: undefined,
                imageWidth: 150,
                imageHeight: 150,
                imageOffsetX: 0,
                imageOffsetY: 0,
                imageClipped: true,
                position: "front",
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5,
                },
              },
              track: {
                show: true,
                startAngle: undefined,
                endAngle: undefined,
                background: "#f2f2f2",
                strokeWidth: "97%",
                opacity: 1,
                margin: 5,
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5,
                },
              },
              dataLabels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "30px",
                  fontFamily: undefined,
                  color: undefined,
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: undefined,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val + " user(s)";
                  },
                },
                total: {
                  show: true,
                  label: "Student",
                  color: "#373d3f",
                  formatter: function ({ config }) {
                    return `${config.series} user(s)`;
                  },
                },
              },
            },
          },
        }}
        series={[data?.Student || 0]}
      />


      <Chart
        type="radialBar"
        width="380"
        options={{
          colors: ['#F44336'],
          plotOptions: {
            radialBar: {
              size: undefined,
              inverseOrder: false,
              startAngle: 0,
              endAngle: 275,
              offsetX: 0,
              offsetY: 0,
              hollow: {
                margin: 5,
                size: "50%",
                background: "transparent",
                image: undefined,
                imageWidth: 150,
                imageHeight: 150,
                imageOffsetX: 0,
                imageOffsetY: 0,
                imageClipped: true,
                position: "front",
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5,
                },
              },
              track: {
                show: true,
                startAngle: undefined,
                endAngle: undefined,
                background: "#f2f2f2",
                strokeWidth: "97%",
                opacity: 1,
                margin: 5,
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5,
                },
              },
              dataLabels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "30px",
                  fontFamily: undefined,
                  color: undefined,
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: undefined,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val + " user(s)";
                  },
                },
                total: {
                  show: true,
                  label: "Teacher",
                  color: "#373d3f",
                  formatter: function ({ config }) {
                    return `${config.series} user(s)`;
                  },
                },
              },
            },
          },
        }}
        series={[data?.Teacher || 0]}
      />

      <Chart
        type="radialBar"
        width="380"
        options={{
          colors: ['#007319'],
          plotOptions: {
            radialBar: {
              size: undefined,
              inverseOrder: false,
              startAngle: 0,
              endAngle: 275,
              offsetX: 0,
              offsetY: 0,
              hollow: {
                margin: 5,
                size: "50%",
                background: "transparent",
                image: undefined,
                imageWidth: 150,
                imageHeight: 150,
                imageOffsetX: 0,
                imageOffsetY: 0,
                imageClipped: true,
                position: "front",
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5,
                },
              },
              track: {
                show: true,
                startAngle: undefined,
                endAngle: undefined,
                background: "#f2f2f2",
                strokeWidth: "97%",
                opacity: 1,
                margin: 5,
                dropShadow: {
                  enabled: false,
                  top: 0,
                  left: 0,
                  blur: 3,
                  opacity: 0.5,
                },
              },
              dataLabels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "30px",
                  fontFamily: undefined,
                  color: undefined,
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: undefined,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val + " user(s)";
                  },
                },
                total: {
                  show: true,
                  label: "Admin",
                  color: "#373d3f",
                  formatter: function ({ config }) {
                    return `${config.series} user(s)`;
                  },
                },
              },
            },
          },
        }}
        series={[data?.Admin || 0]}
      />
    </div>
  );
};

export default UsersChart;
