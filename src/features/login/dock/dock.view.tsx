import { Link } from "react-router-dom";

export function DockComponent() {
  return (
    <>
      <h1> DOCK COMPONENT</h1>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col">
            <button className="btn btn-light">
              <Link to="/ordersDash">ORDERS</Link>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light">
              <Link to="/inventoryDash">INVENTORY</Link>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light">
              <Link to="/recipeDash">RECIPE</Link>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light">
              <Link to="/admin">ADMIN</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
