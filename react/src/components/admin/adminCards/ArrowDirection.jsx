import React from "react";
import debug from "sabio-debug";
const _logger = debug.extend("ArrowDirection");
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArrowDirection(props) {
  _logger("In ArrowDirection");
  if (props.percent === 0) {
    return (
      <FontAwesomeIcon
        icon={["far", "dot-circle"]}
        className="font-size-sm text-warning mr-2"
      />
    );
  } else if (props.percent > 100) {
    return (
      <FontAwesomeIcon
        icon={["fas", "arrow-up"]}
        className="font-size-sm text-success mr-2"
      />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={["fas", "arrow-down"]}
        className="font-size-sm text-danger mr-2"
      />
    );
  }
}

ArrowDirection.propTypes = {
  percent: PropTypes.number,
};

export default ArrowDirection;
