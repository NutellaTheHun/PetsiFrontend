import type { components } from "../../../../api-types";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

type UnitOfMeasureTableProps = {
    unitsOfMeasure: UnitOfMeasure[];
    targetId: number | null;
    isEdit: boolean;
    sortKey: string;
    sortDirection: "ASC" | "DESC";
    setSortKey: (key: string) => void;
    setSortDirection: (direction: "ASC" | "DESC") => void;
};

export const UnitOfMeasureTable = ({
    unitsOfMeasure,
    targetId,
    isEdit,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
}: UnitOfMeasureTableProps) => {
    const columns: GenericTableColumn<UnitOfMeasure>[] = [
        {
            key: "id",
            label: "ID",
            render: (unitOfMeasure) => unitOfMeasure.id,
            sortable: true,
        },
        {
            key: "name",
            label: "Unit of Measure",
            render: (unitOfMeasure) => unitOfMeasure.name,
            sortable: true,
        },
    ];

    return (
        <GenericTable
            data={unitsOfMeasure}
            columns={columns}
            targetId={targetId}
            isEdit={isEdit}
            sortKey={sortKey}
            sortDirection={sortDirection}
            setSortKey={setSortKey}
            setSortDirection={setSortDirection}
        />
    );
};
