export type SidebarProps = {
  children: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  return (
    <div
      className="bg-dark text-white p-3 vh-100"
      style={{
        width: "220px",
      }}
    >
      <ul className="nav flex-column">{children}</ul>
    </div>
  );
}
