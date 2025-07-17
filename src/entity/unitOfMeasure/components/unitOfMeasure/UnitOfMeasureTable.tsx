import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import type { EntityTableContext } from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import { NewEntityTableFactory } from "../../../../lib/entityUIDefinitions/NewEntityTableFactory";
import type {
    UnitOfMeasure,
    UnitOfMeasureCategory,
} from "../../../entityTypes";
import type {
    UnitOfMeasureCreateContext,
    UnitOfMeasureEditContext,
} from "../../hooks/useUnitOfMeasureMutations";
import type { UnitOfMeasureSortKey } from "../../hooks/useUnitOfMeasuresFindAll";
import { UnitOfMeasureRender } from "../../property-render/UnitOfMeasure.render";

export interface UnitOfMeasureTableProps
    extends Omit<
        EntityTableContext<
            UnitOfMeasure,
            UnitOfMeasureEditContext,
            UnitOfMeasureCreateContext,
            UnitOfMeasureSortKey
        >,
        "columns" | "validSortKeys"
    > {
    data: UnitOfMeasure[];
    useEntityMutation: UseEntityMutationsReturn<
        UnitOfMeasure,
        UnitOfMeasureEditContext,
        UnitOfMeasureCreateContext
    >;
    externalSelectedState: [
        UnitOfMeasure | null,
        (entity: UnitOfMeasure | null) => void
    ];
    sortKeyState: [
        UnitOfMeasureSortKey,
        (sortKey: UnitOfMeasureSortKey) => void
    ];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    unitOfMeasureCategories: UnitOfMeasureCategory[];
}

export function UnitOfMeasureTable(props: UnitOfMeasureTableProps) {
    return (
        <NewEntityTableFactory<
            UnitOfMeasure,
            UnitOfMeasureEditContext,
            UnitOfMeasureCreateContext,
            UnitOfMeasureSortKey
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            sortKeyState={props.sortKeyState}
            sortDirectionState={props.sortDirectionState}
            validSortKeys={["name", "category", "id"]}
            columns={[
                {
                    key: "id",
                    label: "ID",
                    sortable: true,
                    renderProperty: (row) => (
                        <UnitOfMeasureRender
                            entityProp="id"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
                {
                    key: "name",
                    label: "Unit of Measure",
                    sortable: true,
                    renderProperty: (row) => (
                        <UnitOfMeasureRender
                            entityProp="name"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
                {
                    key: "abbreviation",
                    label: "Abbreviation",
                    sortable: false,
                    renderProperty: (row) => (
                        <UnitOfMeasureRender
                            entityProp="abbreviation"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
                {
                    key: "category",
                    label: "Category",
                    sortable: true,
                    renderProperty: (row) => (
                        <UnitOfMeasureRender
                            entityProp="category"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                            dataContext={{
                                unitOfMeasureCategories:
                                    props.unitOfMeasureCategories,
                            }}
                        />
                    ),
                },
                {
                    key: "conversionFactorToBase",
                    label: "Conversion Factor to Base",
                    sortable: false,
                    renderProperty: (row) => (
                        <UnitOfMeasureRender
                            entityProp="conversionFactorToBase"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
            ]}
        />
    );
}
