import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ExcelTable from "./ExcelTable";
import { Input } from "reactstrap";

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
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData(data);
      localStorage.setItem("excelData", JSON.stringify(data));
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <div style={{ paddingTop: 60 }}>
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
        <ExcelTable excelData={excelData} />
      </div>
    </>
  );
};

export default Home;
