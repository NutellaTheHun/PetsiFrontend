import { NavLink } from "react-router-dom";

export type ItemProps = {
  text: string;
  linkTo?: string;
  action?: () => void;
};
export function SidebarItem({ text, linkTo, action }: ItemProps) {
  return (
    <li className="nav-item mb-2">
      {action ? (
        <button onClick={action} className="btn btn-danger w-100">
          {text}
        </button>
      ) : (
        <NavLink
          to={linkTo ?? "#"}
          end
          className={({ isActive }) =>
            `btn ${isActive ? "btn-light" : "btn-secondary"} w-100`
          }
        >
          {text}
        </NavLink>
      )}
    </li>
  );
}
