import { useState } from "react";

export function NewRoleForm({
    OnSubmit,
}: {
    OnSubmit: (name: string) => void;
}) {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) return;
        OnSubmit(name.trim());
        setName("");
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="New Role Name"
            />
            <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!name}
            >
                Add
            </button>
        </div>
    );
}
