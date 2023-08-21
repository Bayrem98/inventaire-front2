import React, { useState, useEffect } from "react";
import AffichageFichierExcel from "./AffichageFichierExcel";

const LecteurExcel: React.FC = () => {
  const [excelData, setExcelData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      setExcelData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div>
      <br />
      <AffichageFichierExcel excelData={excelData} />
    </div>
  );
};

export default LecteurExcel;
