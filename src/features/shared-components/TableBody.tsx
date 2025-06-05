import type React from "react";
import type { RowComponentProps } from "./Table";

type Props<T> = {
  data: T[];
  RowComponent: React.ComponentType<RowComponentProps<T>>;
};
export function TableBody<T>({ data, RowComponent }: Props<T>) {
  return (
    <tbody>
      {data.map((item, index) => (
        <RowComponent key={index} item={item} index={index} />
      ))}
    </tbody>
  );
}
