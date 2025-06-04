import { Link } from "react-router-dom";

type Props = {
  linkTo: string;
  text: string;
};
export function DockItem({ linkTo, text }: Props) {
  return (
    <div className="col">
      <button className="btn btn-light">
        <Link to={linkTo}>{text}</Link>
      </button>
    </div>
  );
}
