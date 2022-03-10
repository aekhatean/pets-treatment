import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const SideBar = ({ selections }) => {
  const { lang } = useContext(LanguageContext);
  const [activeSelectionValue, setActiveSelectionValue] = useState(
    selections[0].value
  );
  return (
    <div className="container-fluid" dir={lang === "en" ? "ltr" : "rtl"}>
      <div className="row">
        <div className="col-lg-2 secondary-bg d-flex flex-column py-4">
          {selections.map((selection) => {
            return (
              <p
                key={selection.name}
                className={`h6 ${
                  activeSelectionValue !== selection.value
                    ? "inactive-sidebar-selection"
                    : "active-sidebar-selection"
                }`}
                onClick={() => setActiveSelectionValue(selection.value)}
              >
                {selection.name}
              </p>
            );
          })}
        </div>
        <div className="col-lg-10 d-flex flex-column">
          {
            selections.find(
              (selection) => selection.value === activeSelectionValue
            ).view
          }
        </div>
      </div>
    </div>
  );
};

export default SideBar;
