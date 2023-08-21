import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ExcelTable from "./ExcelTable";
import { Button, Input } from "reactstrap";

const Home = () => {
  const [excelData, setExcelData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      setExcelData(JSON.parse(storedData));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const binaryString = event.target?.result as string;
      const workbook = XLSX.read(binaryString, {
        type: "binary",
        cellDates: true,
        cellNF: false,
        cellText: false,
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formattedData = data.map((row: any[]) =>
        row.map((cell) => {
          if (cell instanceof Date) {
            const year = cell.getFullYear();
            const month = String(cell.getMonth() + 1).padStart(2, "0");
            const day = String(cell.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          }
          return cell;
        })
      );
      setExcelData(formattedData);
      localStorage.setItem("excelData", JSON.stringify(formattedData));
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const handleSaveFile = () => {
    localStorage.setItem("excelData", JSON.stringify(excelData));
    window.location.reload();
    alert("Les modifications ont été enregistrées !");
    window.location.href = "/lecteurexcel";
  };

  const handleCellChange = (
    rowIndex: number,
    columnIndex: number,
    newValue: any
  ) => {
    const updatedData = [...excelData];
    updatedData[rowIndex][columnIndex] = newValue;
    setExcelData(updatedData);
  };

  return (
    <>
      <div style={{ paddingTop: 1 }}>
        <Input
          type="file"
          onChange={handleFileUpload}
          style={{
            width: 310,
            cursor: "pointer",
            borderRadius: 10,
            backgroundColor: "#217575",
            color: "yellow",
          }}
        />
        <br />
        <Button
          style={{
            cursor: "pointer",
            borderRadius: 10,
            backgroundColor: "#217575",
            color: "yellow",
          }}
          onClick={handleSaveFile}
        >
          Enregistrer
        </Button>
        <br />
        <ExcelTable excelData={excelData} onCellChange={handleCellChange} />
      </div>
    </>
  );
};

export default Home;
