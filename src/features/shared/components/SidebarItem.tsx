import { NavLink } from "react-router-dom";

export type ItemProps = {
  text: string;
  linkTo: string;
};
export function SidebarItem({ text, linkTo }: ItemProps) {
  return (
    <li className="nav-item mb-2">
      <NavLink
        to={linkTo}
        end
        className={({ isActive }) =>
          `btn ${isActive ? "btn-light" : "btn-secondary"} w-100`
        }
      >
        {text}
      </NavLink>
    </li>
  );
}
