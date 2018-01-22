import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomTooltip  extends Component
{
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div>
          <p>Date: {(new Date(label)).toLocaleDateString("en-US")}</p>
          <p>Value: ${payload[0].value}</p>
        </div>
      );
    }
    return null;
  }
}

CustomTooltip.propTypes = {
  type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
};

export default CustomTooltip;
