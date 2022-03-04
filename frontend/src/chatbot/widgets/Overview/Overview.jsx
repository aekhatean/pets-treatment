import React from "react";
import styles from "./Overview.module.css";
import GeneralOptions from "../options/GeneralOptions/GeneralOptions";

const Overview = props => {
  return (
    <div className={styles.overview}>
      <GeneralOptions actionProvider={props.actionProvider} />
    </div>
  );
};

export default Overview;
