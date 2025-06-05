type Props = {
  colNames: string[];
};
export function TableHeader({ colNames }: Props) {
  return (
    <thead>
      <tr>
        {colNames.map((name, i) => {
          return (
            <th key={i} scope="col">
              {name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
