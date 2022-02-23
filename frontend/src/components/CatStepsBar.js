import React, { Fragment } from "react";
import CatStep from "./CatStep";

function CatStepsBar(props) {
  const { steps } = props;

  return (
    <div className="my-5">
      {steps.map((step, i) => (
        <CatStep key={i} step={i + 1} content={step} />
      ))}
    </div>
  );
}

export default CatStepsBar;
