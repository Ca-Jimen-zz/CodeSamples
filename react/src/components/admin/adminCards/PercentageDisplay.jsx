import React from "react";
import debug from "sabio-debug";
const _logger = debug.extend("PercentageDisplay");
import PropTypes from "prop-types";

function PercentageDisplay(props) {
  _logger("percent:", props.percent);
  if (props.percent === 0) {
    return <div>no previous data to compare</div>;
  } else if (props.percent > 100) {
    return (
      <div>
        <b>+{props.percent}%</b> since last {props.selectBy}
      </div>
    );
  } else if (props.percent < 100) {
    return (
      <div>
        <b>-{props.percent}%</b> since last {props.selectBy}
      </div>
    );
  } else {
    return <div>no increase since last {props.selectBy}</div>;
  }
}

PercentageDisplay.propTypes = {
  percent: PropTypes.number,
  selectBy: PropTypes.string,
};

export default PercentageDisplay;
