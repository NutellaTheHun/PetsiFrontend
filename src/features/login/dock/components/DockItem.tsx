import { Link } from "react-router-dom";

type Props = {
    linkTo: string;
    text: string;
};
export function DockItem({ linkTo, text }: Props) {
    return (
        <div className="col">
            <Link to={linkTo} className="btn btn-info w-100 text-center">
                {text}
            </Link>
        </div>
    );
}
