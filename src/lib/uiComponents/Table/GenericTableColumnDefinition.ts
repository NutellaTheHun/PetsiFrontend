import type { GenericStatefulEntity } from "../../GenericStatefulEntity";

export type GenericTableColumnDefinition<T, TEditContext, TCreateContext> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    renderProperty: (entity: GenericStatefulEntity<T>) => React.ReactNode;
};
