import React from "react";

import Button from "../../../../components/button";

const Tab = ({ label, handleClick, index }) => (
  <div className="tab">
    <Button
      label={label}
      variant="filled"
      color="var(--color-primary)"
      handleClick={() => handleClick(index)}
    />
  </div>
);

export default Tab;
