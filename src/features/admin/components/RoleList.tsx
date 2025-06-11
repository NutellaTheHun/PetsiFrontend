type Props = {};
export function RoleList({}: Props) {
    //const { data, error, isLoading } = $api.useQuery("get", "/roles");
    //if (!data || isLoading) return "Loading...";
    //if (error) return `An error occured: ${error}`;

    //const roles = data.items as components["schemas"]["Role"][];

    const roles = [
        { id: 1, roleName: "admin" },
        { id: 2, roleName: "manager" },
        { id: 3, roleName: "staff" },
    ];
    return (
        <div
            className="container"
            style={{ width: "400px", border: "2px solid black" }}
        >
            <ul className="list-group list-group-flush">
                {roles.map((role) => (
                    <li className="list-group-item" key={role.id}>
                        {role.roleName}
                    </li>
                ))}
            </ul>
        </div>
    );
}
