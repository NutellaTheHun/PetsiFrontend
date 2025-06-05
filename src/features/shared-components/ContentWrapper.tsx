import type React from "react";

type Props = {
  children: React.ReactNode;
};
export function ContentWrapper({ children }: Props) {
  return <div className="flex-grow-1 p-4">{children}</div>;
}
