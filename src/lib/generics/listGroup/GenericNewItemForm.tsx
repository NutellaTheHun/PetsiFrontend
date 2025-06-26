import { useState } from "react";

export function GenericNewItemForm({
    onSubmit,
}: {
    onSubmit: (value: string) => void;
}) {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        onSubmit(value);
        setValue("");
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="form-control"
                placeholder="New entity"
            />

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!value.trim()}
            >
                Add
            </button>
        </div>
    );
}
