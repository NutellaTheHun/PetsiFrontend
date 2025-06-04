import type React from "react";
import { type WindowProps } from "../../../../base/window/base-window";

export function LoginWindow({ children }: WindowProps) {
  return <div style={style}>{children}</div>;
}

const style: React.CSSProperties = {
  height: "400px",
  width: "400px",
  backgroundColor: "grey",
  border: "2px solid black",
  alignContent: "center",
};
