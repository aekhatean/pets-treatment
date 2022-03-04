import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import CatStep from "./CatStep";

function CatStepsBar(props) {
  const { steps } = props;

  return (
    <Container className="p-5">
      {steps.map((step, i) => (
        <CatStep key={i} index={i} step={i + 1} content={step} />
      ))}
    </Container>
  );
}

export default CatStepsBar;
