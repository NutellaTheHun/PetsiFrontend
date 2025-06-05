import { ContentWrapper } from "../shared-components/ContentWrapper";
import { Sidebar } from "../shared-components/Sidebar";
import { AdminWindow } from "./admin.window";

export function AdminPage() {
  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <Sidebar />

      <ContentWrapper>
        <AdminWindow />
      </ContentWrapper>
    </div>
  );
}
