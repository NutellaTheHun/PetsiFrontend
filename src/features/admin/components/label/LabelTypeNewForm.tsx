import { useState } from "react";

type Props = {
    onSubmit: (data: {
        labelTypeName: string;
        labelTypeLength: number;
        labelTypeWidth: number;
    }) => void;
};
export function LabelTypeNewForm({ onSubmit }: Props) {
    const [name, setName] = useState("");
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);

    const isFormValid =
        name.trim() !== "" &&
        typeof length === "number" &&
        !isNaN(length) &&
        typeof width === "number" &&
        !isNaN(width);

    return (
        <div>
            <label>Create new label type</label>
            <div className="d-flex gap-2">
                <input
                    type="text"
                    className="form-control-sm"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="form-control-sm"
                    type="text"
                    placeholder="Length"
                    onChange={(e) => setLength(Number(e.target.value))}
                />
                <input
                    type="text"
                    className="form-control-sm"
                    placeholder="Width"
                    onChange={(e) => setWidth(Number(e.target.value))}
                />
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        if (!isFormValid) return;
                        onSubmit({
                            labelTypeName: name,
                            labelTypeLength: length,
                            labelTypeWidth: width,
                        });
                        setName("");
                        setLength(0);
                        setWidth(0);
                    }}
                >
                    Create
                </button>
            </div>
        </div>
    );
}
