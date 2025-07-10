import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { TemplateMenuItem } from "../../entityTypes";

export type TemplateMenuItemSortKey = keyof Pick<
    TemplateMenuItem,
    "tablePosIndex" | "id"
>;

export interface UseTemplateMenuItemsOptions {
    relations?: (keyof TemplateMenuItem)[];
    selectedTemplateId?: number | null;
    limit?: number;
    offset?: string;
}

export function useTemplateMenuItemsFindAll(
    options: UseTemplateMenuItemsOptions = {}
) {
    return useEntityFindAll<
        TemplateMenuItem,
        TemplateMenuItemSortKey,
        UseTemplateMenuItemsOptions
    >(
        {
            endpoint: "/template-menu-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "templateMenuItems",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedTemplateId) {
                    queryParams.filters = [
                        `parentTemplate,${options.selectedTemplateId}`,
                    ];
                }
            },
        },
        options
    );
}
