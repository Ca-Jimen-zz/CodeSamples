import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("AdminAnalyticsDates");

function AdminAnalyticsDates(props) {
  const [selectBy, setSelectBy] = useState("");
  const [mappedYears, setMappedYears] = useState([]);

  useEffect(() => {
    _logger(props);
    let year = new Date();
    year = year.getFullYear();
    calculateYears(parseInt(year));
  }, []);

  const calculateYears = (year) => {
    _logger("year as int", year);
    setSelectBy(year);
    let yearsArray = [];
    for (let x = 3; x > 0; x--) {
      yearsArray.push(year);
      year--;
    }
    setMappedYears(yearsArray.map(mapYears));
    _logger(yearsArray);
  };

  const mapYears = (elem) => {
    return (
      <MenuItem key={`year_${elem}`} value={elem}>
        {elem}
      </MenuItem>
    );
  };

  const handleChange = (e) => {
    _logger("value changed", e.target.value);
    setSelectBy(e.target.value);
    props.yearChange(e.target.value);
  };

  return (
    <Select
      value={selectBy}
      onChange={handleChange}
      justify="right"
      className="mx-2"
    >
      {mappedYears}
    </Select>
  );
}

AdminAnalyticsDates.propTypes = {
  yearChange: PropTypes.func,
};

export default AdminAnalyticsDates;
