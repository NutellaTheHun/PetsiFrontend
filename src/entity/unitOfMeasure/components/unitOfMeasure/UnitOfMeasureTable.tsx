import { useState } from "react";
import { setStatefulData } from "../../../../lib/generics/GenericStatefulEntity";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import type {
    UnitOfMeasure,
    UpdateUnitOfMeasureDto,
} from "../../../entityTypes";

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
    const [editId, setEditId] = useState<number | null>(null);

    const statefulUnitsOfMeasure = setStatefulData(
        unitsOfMeasure,
        targetId,
        editId
    );

    const columns: GenericTableColumn<UnitOfMeasure>[] = [
        {
            key: "id",
            label: "ID",
            render: (unitOfMeasure) => unitOfMeasure.entity.id,
            sortable: false,
        },
        {
            key: "name",
            label: "Unit of Measure",
            render: (unitOfMeasure) => unitOfMeasure.entity.name,
            sortable: true,
        },
        {
            key: "abbreviation",
            label: "Abbreviation",
            render: (unitOfMeasure) => unitOfMeasure.entity.abbreviation,
            sortable: false,
        },
        {
            key: "category",
            label: "Category",
            render: (unitOfMeasure) =>
                unitOfMeasure.entity.category?.categoryName,
            sortable: true,
        },
        {
            key: "conversionFactorToBase",
            label: "Conversion Factor to Base",
            render: (unitOfMeasure) =>
                unitOfMeasure.entity.conversionFactorToBase,
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
            data={statefulUnitsOfMeasure}
            columns={columns}
            onHeaderClick={handleHeaderClick}
            sortBy={sortKey}
            sortDirection={sortDirection}
            onSetEdit={setEdit}
            onSetSelected={setSelect}
            onDelete={(id) =>
                deleteUnitOfMeasure.mutate({ params: { path: { id } } })
            }
            onUpdate={(id) => {
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
