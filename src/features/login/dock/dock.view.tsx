import { Link } from "react-router-dom";
import { ROUTE } from "../../../app/routes/constants";

export function DockComponent() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="row align-items-center rounded shadow p-4"
        style={{ height: "200px", width: "600px", backgroundColor: "#BAD1CD" }}
      >
        <div className="col">
          <button className="btn btn-light">
            <Link to={ROUTE.ORDER.ROOT}>ORDERS</Link>
          </button>
        </div>
        <div className="col">
          <button className="btn btn-light">
            <Link to={ROUTE.INVENTORY.ROOT}>INVENTORY</Link>
          </button>
        </div>
        <div className="col">
          <button className="btn btn-light">
            <Link to={ROUTE.RECIPE.ROOT}>RECIPE</Link>
          </button>
        </div>
        <div className="col">
          <button className="btn btn-light">
            <Link to={ROUTE.ADMIN}>ADMIN</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
