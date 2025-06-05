import type { RowComponentProps } from "./Table";

export type Item = {
  id: number;
  name: string;
  category: string;
  quantity: number;
};

export function RowComponent({ item, index }: RowComponentProps<Item>) {
  return (
    <tr>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>{item.quantity}</td>
    </tr>
  );
}
