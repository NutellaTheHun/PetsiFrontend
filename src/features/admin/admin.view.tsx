import { Sidebar } from "../shared/components/Sidebar";

export function AdminView() {
  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <h1>Content</h1>
      </div>
    </div>
  );
}
