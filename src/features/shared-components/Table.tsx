import type React from "react";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export type RowComponentProps<T> = {
  item: T;
  index: number;
};

type TableProps<T> = {
  colNames: string[];
  data: T[];
  RowComponent: React.ComponentType<RowComponentProps<T>>;
};

export function Table<T>({ colNames, data, RowComponent }: TableProps<T>) {
  return (
    <table className="table table-striped">
      <TableHeader colNames={colNames} />
      <TableBody data={data} RowComponent={RowComponent} />
    </table>
  );
}
