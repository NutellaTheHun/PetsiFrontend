import { getUserRoles } from "../../../util/auth";
import { ValidDockItems } from "./components/ValidDockItems";

export function DockPage() {
  const roles: string[] = getUserRoles();
  if (!roles || roles.length === 0) {
    throw new Error();
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="row align-items-center rounded shadow p-4"
        style={{ height: "200px", width: "600px", backgroundColor: "#BAD1CD" }}
      >
        <ValidDockItems userRoles={roles} />
      </div>
    </div>
  );
}
