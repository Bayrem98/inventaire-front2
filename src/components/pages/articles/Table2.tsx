import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import TousArticles from "./TousArticles";

/*
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const TableAndtWithFactures: React.FC = () => {
  // Utilisez les données de TousArticles ici
  const factures = TousArticles(); // Remplacez cela par la manière dont vous récupérez vos données de factures

  // Transformez les données de factures en un format adapté pour le tableau
  const tableData = flatMap(factures, (facture: any) =>
    facture.articles.map((article: any, index: any) => ({
      key: `${facture._id}-${article._id}-${index}`,
      name: article.sub_article[0].designation,
      age: article.sub_article[0].prixut,
      address: article.sub_article[0].marque,
      qc: article.sub_article.length,
      prixTotal: (
        article.sub_article[0].prixut * article.sub_article.length
      ).toFixed(3),
    }))
  );

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Bayrem",
          value: "Bayrem",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value: any, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value: any, record) => record.address.indexOf(value) === 0,
    },
  ];

  return (
    <div style={{ paddingTop: 150 }}>
      <Table columns={columns} dataSource={tableData} onChange={onChange} />
    </div>
  );
};

export default TableAndtWithFactures;
*/
