import React from "react";
import { Table } from "react-bootstrap";

export default function DynamicTable(props) {
  const { tableContent } = props;
  const columns = Object.keys(tableContent[0]);

	return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableContent.map((dataObject, index) => (
            <tr>
              <td>{index}</td>
              {Object.keys(dataObject).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>{" "}
    </div>
  );
}
