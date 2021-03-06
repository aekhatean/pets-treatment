import React from "react";
import { Table } from "react-bootstrap";

export default function DynamicTable(props) {
  const { tableContent } = props;

  if (tableContent.length) {
    const columns = Object.keys(tableContent[0]);

    return (
      <div className="panel panel-default">
        <Table responsive striped bordered hover>
          <thead className="secondary-bg">
            <tr>
              <th>#</th>
              {columns.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableContent.map((dataObject, index) => (
              <tr key={index}>
                <td>{index}</td>
                {Object.keys(dataObject).map((cell, index) => (
                  <td key={index}>{dataObject[cell]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return <div className="alert primary-bg">You have no appointments</div>;
  }
}
