import React, { useState } from "react";
import { Input, Table } from "reactstrap";

const ExcelTable = ({
  excelData,
  onCellChange,
}: {
  excelData: any[][];
  onCellChange: (rowIndex: number, columnIndex: number, newValue: any) => void;
}) => {
  const [filterValue, setFilterValue] = useState("");

  if (!excelData.length) {
    return null;
  }

  const filteredData = excelData.filter((rowData: any[]) =>
    rowData.some((cellData: any) =>
      String(cellData).toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const renderedData = filteredData.map((rowData: any[], rowIndex: number) => (
    <tr key={`row-${rowIndex}`}>
      {rowData.map((cellData: any, cellIndex: number) => {
        return (
          <td key={`cell-${cellIndex}`} style={{ fontSize: 12, padding: 1 }}>
            <input
              type="text"
              value={cellData}
              onChange={(e) =>
                onCellChange(rowIndex, cellIndex, e.target.value)
              }
            />
          </td>
        );
      })}
    </tr>
  ));

  return (
    <div>
      <br />
      <Input
        style={{
          width: 150,
          height: 30,
          borderRadius: 10,
          borderColor: "#217575",
          backgroundColor: "lightgray",
          marginBottom: 10,
        }}
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Filtrer..."
      />
      <br />
      <div style={{ maxHeight: "630px",overflow: "auto" }}>
        <Table bordered hover responsive>
          <thead
            style={{ textAlign: "center", fontSize: 10, fontWeight: "bold" }}
          >
            <tr>
              {excelData[0].map((header: string, index: number) => (
                <th key={`header-${index}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{renderedData}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default ExcelTable;
