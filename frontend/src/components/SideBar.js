import { useState } from "react";

const SideBar = ({ selections }) => {
  const [activeSelection, setActiveSelection] = useState(selections[0].name);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 secondary-bg d-flex flex-column py-4">
          {selections.map((selection) => {
            return (
              <p
                key={selection.name}
                className={`h6 ${
                  activeSelection !== selection.name
                    ? "inactive-sidebar-selection"
                    : "active-sidebar-selection"
                }`}
                onClick={() => setActiveSelection(selection.name)}
              >
                {selection.name}
              </p>
            );
          })}
        </div>
        <div className="col-lg-10 d-flex flex-column">
          {
            selections.find((selection) => selection.name === activeSelection)
              .view
          }
        </div>
      </div>
    </div>
  );
};

export default SideBar;
