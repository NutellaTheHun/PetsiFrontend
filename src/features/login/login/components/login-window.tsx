import type React from "react";

type Props = {
  children: React.ReactNode;
};
export function LoginWindow({ children }: Props) {
  return <div style={style}>{children}</div>;
}

const style: React.CSSProperties = {
  height: "400px",
  width: "400px",
  backgroundColor: "grey",
  border: "2px solid black",
  alignContent: "center",
};
