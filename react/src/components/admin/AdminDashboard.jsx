import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
const _logger = debug.extend("AdminDash");
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AdminAnalyticsGraphs from "./AdminAnalyticsGraphs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAnalyticsDates from "./AdminAnalyticsDates";

import * as AdminService from "../../services/adminService";

const AdminDashboard = () => {
  //These hold the data coming in from the database
  const [entireObj, setEntireObj] = useState({});
  const [selectBy, setSelectBy] = useState("week");
  const [searchBy, setSearchBy] = useState({
    yearStart: new Date().getFullYear() + "-01-01",
    yearEnd: new Date().getFullYear() + "-12-31",
  });

  //pad takes in a single digit and returns two digits. basically adds a zero in front of digits if needed.
  const pad = (elem) => {
    return ("00" + elem).slice(-2);
  };

  useEffect(() => {
    _logger("getting analytics.");
    _logger("This is searchBy", searchBy);
    let filterBy = 0;
    if (selectBy === "year") {
      filterBy = 2;
      let date = new Date();
      date = date.getFullYear() + "-12-31";
      let search = {
        yearStart: "2019-01-01",
        yearEnd: date,
      };
      AdminService.getAnalytics(filterBy, search)
        .then(onGetSuccess)
        .catch(onGetError);
    } else {
      if (selectBy === "month") {
        filterBy = 1;
      }
      AdminService.getAnalytics(filterBy, searchBy)
        .then(onGetSuccess)
        .catch(onGetError);
    }
  }, [selectBy, searchBy]);

  const onGetSuccess = (response) => {
    _logger("ajax call response", response);
    //let percents = calculatePercentages(response.item);
    let newObj = response.item;
    //newObj.percents = percents;
    newObj.sales = response.item.sales.map(mapRevenue);
    newObj.percents = calculatePercentages(newObj);
    _logger("Entire Object after calculations", newObj);
    setEntireObj(newObj);
  };

  const onGetError = (err) => {
    _logger({ error: err });
    toast.error(err, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChange = (e) => {
    setSelectBy(e.target.value);
  };

  //sales numbers are in cents so this function calculates revenue and removes the cents from the totals.
  const mapRevenue = (item) => {
    return {
      count: item.count,
      date: item.date,
      salesTotal: Math.round(item.salesTotal / 100),
      salesTransfer: Math.round(item.salesTransfer / 100),
      revenue: Math.round((item.salesTotal - item.salesTransfer) / 100),
    };
  };

  const calculatePercentages = (item) => {
    let calcPercent = {
      chefPercentage: 0,
      kitchenPercentage: 0,
      userPercentage: 0,
      listingPercentage: 0,
      salesPercentage: 0,
      orderPercentage: 0,
    };
    if (item.chefCount !== null && item.chefCount.length > 1) {
      calcPercent.chefPercentage = Math.abs(
        Math.round(
          100 * (1 - item.chefCount[0].count / item.chefCount[1].count)
        )
      );
    } else {
      calcPercent.chefPercentage = 0;
    }

    if (item.kitchenCount !== null && item.kitchenCount.length > 1) {
      calcPercent.kitchenPercentage = Math.abs(
        Math.round(
          100 * (1 - item.kitchenCount[0].count / item.kitchenCount[1].count)
        )
      );
    } else {
      calcPercent.chefPercentage = 0;
    }
    if (item.userCount !== null && item.userCount.length > 1) {
      calcPercent.userPercentage = Math.abs(
        Math.round(
          100 * (1 - item.userCount[0].count / item.userCount[1].count)
        )
      );
    } else {
      calcPercent.userPercentage = 0;
    }
    if (item.listingCount !== null && item.listingCount.length > 1) {
      calcPercent.listingPercentage = Math.abs(
        Math.round(
          100 * (1 - item.listingCount[0].count / item.listingCount[1].count)
        )
      );
    } else {
      calcPercent.listingPercentage = 0;
    }
    if (item.sales !== null && item.sales.length > 1) {
      calcPercent.salesPercentage = Math.abs(
        Math.round(100 * (item.sales[0].revenue / item.sales[1].revenue))
      );
    } else {
      calcPercent.salesPercentage = 0;
    }
    if (item.orderAmounts !== null && item.orderAmounts.length > 1) {
      calcPercent.orderPercentage = Math.abs(
        Math.round(
          100 *
            (item.orderAmounts[0].orderTotal / item.orderAmounts[1].orderTotal)
        )
      );
    } else {
      calcPercent.orderPercentage = 0;
    }

    _logger(calcPercent);
    return calcPercent;
  };

  const yearChange = (year) => {
    _logger("NEW YEAR SELECTED", year);
    setSearchBy(getDate(year));
  };

  const getDate = (yearSelected = 0) => {
    let yearStart = 0;
    if (yearSelected === 0) {
      let today = new Date();
      today =
        today.getFullYear() +
        "-" +
        pad(today.getMonth() + 1) +
        "-" +
        pad(today.getDate());
      yearStart = new Date().getFullYear() + "-01-01";
      return { yearStart, yearEnd: today };
    } else {
      let yearEnd = yearSelected + "-12-31";
      return { yearStart: yearSelected + "-01-01", yearEnd };
    }
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="d-flex justify-content-center form-group">
          <label style={{ fontSize: 1.3 + "em" }}>
            Filter:
            <Select value={selectBy} onChange={handleChange} className="mx-2">
              <MenuItem value={"week"}>Week</MenuItem>
              <MenuItem value={"month"}>Month</MenuItem>
              <MenuItem value={"year"}>Years</MenuItem>
            </Select>
          </label>
          <label style={{ fontSize: 1.3 + "em" }}>
            Year:
            <AdminAnalyticsDates yearChange={yearChange} />
          </label>
        </div>
        <AdminAnalyticsGraphs
          item={entireObj}
          year={searchBy.yearStart}
          date={selectBy}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
