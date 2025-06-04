import { getUserRoles } from "../../../util/auth";
import { ValidFeatures } from "./components/ValidFeatures";

export function DockComponent() {
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
        <ValidFeatures userRoles={roles} />
      </div>
    </div>
  );
}
