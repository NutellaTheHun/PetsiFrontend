import { useState } from "react";
import type { components } from "../../../../api-types";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];
type UpdateUnitOfMeasureDto = components["schemas"]["UpdateUnitOfMeasureDto"];
type CreateUnitOfMeasureDto = components["schemas"]["CreateUnitOfMeasureDto"];

type Props = {
    unitsOfMeasure: UnitOfMeasure[];
    targetId: number | null;
    isEdit: boolean;
    sortKey: string;
    sortDirection: "ASC" | "DESC";
    setSortKey: (key: string) => void;
    setSortDirection: (direction: "ASC" | "DESC") => void;
    setEdit: (id: number | null) => void;
    setSelect: (id: number | null) => void;
    deleteUnitOfMeasure: any;
    createUnitOfMeasure: any;
    updateUnitOfMeasure: any;
};

export const UnitOfMeasureTable = ({
    unitsOfMeasure,
    targetId,
    isEdit,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
    setEdit,
    setSelect,
    deleteUnitOfMeasure,
    updateUnitOfMeasure,
    createUnitOfMeasure,
}: Props) => {
    const [editValues, setEditValues] = useState<UpdateUnitOfMeasureDto | null>(
        null
    );

    const columns: GenericTableColumn<UnitOfMeasure>[] = [
        {
            key: "id",
            label: "ID",
            render: (unitOfMeasure) => unitOfMeasure.id,
            sortable: false,
        },
        {
            key: "name",
            label: "Unit of Measure",
            render: (unitOfMeasure) => unitOfMeasure.name,
            sortable: true,
        },
        {
            key: "abbreviation",
            label: "Abbreviation",
            render: (unitOfMeasure) => unitOfMeasure.abbreviation,
            sortable: false,
        },
        {
            key: "category",
            label: "Category",
            render: (unitOfMeasure) => unitOfMeasure.category?.categoryName,
            sortable: true,
        },
        {
            key: "conversionFactorToBase",
            label: "Conversion Factor to Base",
            render: (unitOfMeasure) => unitOfMeasure.conversionFactorToBase,
            sortable: false,
        },
    ];

    const handleHeaderClick = (key: keyof UnitOfMeasure) => {
        if (key !== "category" && key !== "name") {
            return;
        }

        if (key === sortKey) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortKey(key);
            setSortDirection("ASC");
        }
    };

    const handleValueChange = (
        key: keyof UpdateUnitOfMeasureDto,
        value: string | number | null
    ) => {
        setEditValues((prev) => ({ ...prev, [key]: value }));
    };

    const context = {
        setName: (name: string) => {
            handleValueChange("unitName", name);
        },
        setCategory: (id: number | null) => {
            handleValueChange("categoryId", id);
        },
        setAbbreviation: (abbreviation: string) => {
            handleValueChange("abbreviation", abbreviation);
        },
        setConversionFactorToBase: (conversionFactorToBase: string) => {
            handleValueChange("conversionFactorToBase", conversionFactorToBase);
        },
    };

    return (
        <GenericTable
            data={unitsOfMeasure}
            columns={columns}
            targetId={targetId}
            isEdit={isEdit}
            onHeaderClick={handleHeaderClick}
            sortBy={sortKey}
            sortDirection={sortDirection}
            onSetEdit={setEdit}
            onSetSelected={setSelect}
            onDeleteRow={(id) =>
                deleteUnitOfMeasure.mutate({ params: { path: { id } } })
            }
            onUpdateRow={(id) => {
                if (editValues) {
                    updateUnitOfMeasure.mutate({
                        params: { path: { id } },
                        body: editValues,
                    });
                }
            }}
        />
    );
};
