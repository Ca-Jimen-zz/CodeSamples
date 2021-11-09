import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Card,
  Divider,
  Grid,
} from "@material-ui/core";

import { Line } from "react-chartjs-2";
import debug from "sabio-debug";
const _logger = debug.extend("AdminAnalyticsDetailButton");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      backgroundColor: "rgba(65, 145, 255, 0.4)",
      borderCapStyle: "round",
      borderDash: [],
      borderWidth: 3,
      borderColor: "#4191ff",
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#4191ff",
      pointBackgroundColor: "#ffffff",
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 3,
      pointHoverBackgroundColor: "#ffffff",
      pointHoverBorderColor: "#4191ff",
      data: [65, 59, 80, 81, 56, 55, 40],
      datalabels: {
        display: false,
      },
      label: "Series A",
    },
  ],
};
const dataOptions = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: true,
          beginAtZero: true,
        },
        gridLines: {
          display: true,
          color: "#eeeff8",
          drawBorder: true,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
};

function AdminAnalyticsDetailButton(props) {
  const [open, setOpen] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [customButton, setCustomButton] = useState("");
  const [graphTrigger, setGraphTrigger] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    _logger("props", props);
    if (props.itemData !== null) {
      if (props.date === "week") {
        data.labels = props.itemData.map(mapWeekToDate).reverse();
        data.datasets[0].label = props.name;
        data.datasets[0].data = props.itemData
          .map(mapCountsAndTotals)
          .reverse();
      } else if (props.date === "month") {
        data.labels = props.itemData.map(mapMonths).reverse();
        data.datasets[0].data = props.name;
        data.datasets[0].data = props.itemData
          .map(mapCountsAndTotals)
          .reverse();
      } else {
        data.labels = props.itemData.map(mapYear).reverse();
        data.datasets[0].label = props.name;
        data.datasets[0].data = props.itemData
          .map(mapCountsAndTotals)
          .reverse();
      }
      let total = 0;
      for (let x = 0; x < props.itemData.length; x++) {
        total += props.itemData[x].count;
      }
      if (props.name === "Sales") {
        let totalRevenue = 0;
        for (let x = 0; x < props.itemData.length; x++) {
          totalRevenue += props.itemData[x].revenue;
        }
        _logger("total Count:", total, "Total Revenue: ", totalRevenue);
        setCount({ total, totalRevenue });
      } else {
        _logger("total Count:", total);
        setCount(total);
      }
    }
    if (
      props.name === "Listings" ||
      props.name === "Chefs" ||
      props.name === "Users"
    ) {
      setCustomButton(
        <Button
          size="small"
          variant="outlined"
          style={buttonStyle}
          onClick={handleClickOpen}
          className="text-uppercase font-size-xs"
        >
          Details
        </Button>
      );
    } else {
      setCustomButton(
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          className="text-uppercase font-size-xs"
        >
          Details
        </Button>
      );
    }
    setRenderPage(true);
    return function cleanUp() {
      setRenderPage(false);
    };
  }, [graphTrigger, props]);

  const mapWeekToDate = (elem) => {
    let year = props.year;
    year = year.toString();
    year = year.split("-");
    year = year[0];
    var dayOfWeek = (parseInt(elem.date) - 1) * 7 - 1;
    let day = new Date(year, 0, dayOfWeek);
    const dayDateYear = day.toString().split(" ");
    day = dayDateYear.splice(0, 3);
    return day.join(" ");
  };

  const mapMonths = (elem) => {
    return months[parseInt(elem.date) - 1];
  };

  const mapYear = (elem) => {
    return elem.date;
  };

  const mapCountsAndTotals = (elem) => {
    if (
      props.name === "Kitchen" ||
      props.name === "Users" ||
      props.name === "Chefs" ||
      props.name === "Listings"
    ) {
      return elem.count;
    } else if (props.name === "Orders") {
      return elem.orderTotal;
    } else {
      return elem.revenue;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setGraphTrigger(!graphTrigger);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buttonStyle = {
    color: "white",
    borderColor: "white",
  };

  return (
    <React.Fragment>
      {customButton}
      {renderPage && (
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogContent>
            <Card className="card-box mb-4">
              <div className="card-header-alt px-4 pt-4 pb-0">
                <h6 className="font-size-lg mb-3 text-dark">
                  {props.name} statistics
                </h6>
              </div>
              <div className="sparkline-full-wrapper sparkline-full-wrapper--xxl px-4 m-0">
                <Line data={data} options={dataOptions} />
              </div>
              <div className="p-4">
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                  Performance
                </h6>
                <p className="text-black-50 mb-0">
                  Portfolio performance for selected period.
                </p>
              </div>
              <Divider />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="font-weight-bold">
                        Total Number of {props.name}
                      </div>
                      <div className="font-size-lg font-weight-bold text-warning">
                        {count.total ? count.total : count}
                      </div>
                    </div>
                  </div>
                </Grid>
                {props.name === "Sales" && (
                  <Grid item xs={12} sm={6}>
                    <div className="p-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="font-weight-bold">Total Revenue</div>
                        <div className="font-size-lg font-weight-bold text-warning">
                          ${count.totalRevenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}

AdminAnalyticsDetailButton.propTypes = {
  itemData: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  year: PropTypes.string,
  date: PropTypes.string,
};

export default AdminAnalyticsDetailButton;
