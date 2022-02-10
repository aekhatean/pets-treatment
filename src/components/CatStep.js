import React from "react";
import paw from "../assets/paw.svg";
function CatStep(props) {
  const { step, content } = props;
  return (
    <div className="d-flex">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ transform: "rotate(270deg", height: 170 }}
      >
        <hr width="170" size="4" />
        <span>
          <img
            src={paw}
            alt="catpaw"
            style={{ width: 40, transform: "rotate(270deg)" }}
          />
        </span>
        <hr width="40" size="4" />
      </div>
      <div className="d-flex flex-column">
        {/* <span
          className="badge bg-dark translate-middle fs-6 py-auto"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        >
          {step}
        </span> */}
        <div
          className="shadow my-5"
          style={{
            maxWidth: 300,
            height: "fit-content",
            overflowWrap: "break-word",
            padding: 10,
            borderRadius: 30,
            transform: "skew(-15deg)",
          }}
        >
          <span
            className="badge bg-dark translate-middle float-start fs-6 py-auto"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          >
            {step}
          </span>
          <p className="fs-6" style={{ width: 200 }}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CatStep;
