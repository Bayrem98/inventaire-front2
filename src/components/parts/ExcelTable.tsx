import { Input, Table } from "reactstrap";
import React, { useState } from "react";

const ExcelTable = ({ excelData }: { excelData: any[][] }) => {
  const [filterValue, setFilterValue] = useState("");
  /*  const [modifiedData, setModifiedData] = useState(excelData);

  const handleCellValueChange = (newValue: any, rowIndex: any, cellIndex: any) => {
    const newData = [...modifiedData];
    newData[rowIndex][cellIndex] = newValue;
    setModifiedData(newData);
  };
  
  rowData.map((cellData: any, cellIndex: number) => (
    <td key={`cell-${cellIndex}`} style={{ padding: 1 }}>
      <input
        type="text"
        value={cellData}
        onChange={(e) =>
          handleCellValueChange(e.target.value, rowIndex, cellIndex)
        }
      />
    </td>
  )); 
  
  const renderedData = modifiedData.map((rowData: any[], rowIndex: number) => (
  // ...
));
  
  */

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
      {rowData.map((cellData: any, cellIndex: number) => (
        <td key={`cell-${cellIndex}`} style={{ padding: 1 }}>
          {cellData}
        </td>
      ))}
    </tr>
  ));

  return (
    <div>
      <Input
        style={{
          width: 150,
          height: 30,
          borderRadius: 10,
          borderColor: "#217575",
          backgroundColor: "lightgray",
        }}
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Filtrer..."
      />
      <br />
      <Table bordered hover responsive>
        <thead style={{ textAlign: "center", fontSize: 9 }}>
          <tr>
            {excelData[0].map((header: string, index: number) => (
              <th key={`header-${index}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: 9 }}>{renderedData}</tbody>
      </Table>
    </div>
  );
};

export default ExcelTable;
