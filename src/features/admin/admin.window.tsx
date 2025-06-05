import { RowComponent, type Item } from "../shared-components/RowComponent";
import { Table } from "../shared-components/Table";

export function AdminWindow() {
  const colNames = ["id", "name", "category", "quantity"];
  const data = [
    {
      id: 1,
      name: "apple",
      category: "fruit",
      quantity: 3,
    },
    {
      id: 2,
      name: "carrot",
      category: "vegetable",
      quantity: 4,
    },
  ];
  return (
    <Table<Item> colNames={colNames} data={data} RowComponent={RowComponent} />
  );
}
