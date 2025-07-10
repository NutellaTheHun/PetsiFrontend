import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateTemplateMenuItemDto,
    MenuItem,
    Template,
    TemplateMenuItem,
    UpdateTemplateMenuItemDto,
} from "../../entityTypes";
import type { TemplateMenuItemRenderContext } from "../property-render/TemplateMenuItem.render";

export type TemplateMenuItemEditContext = Pick<
    TemplateMenuItemRenderContext,
    "setDisplayName" | "setMenuItem" | "setTablePosIndex"
>;

export type TemplateMenuItemCreateContext = Pick<
    TemplateMenuItemRenderContext,
    "setDisplayName" | "setMenuItem" | "setTablePosIndex" | "setParentTemplate"
>;

// DTO converter for TemplateMenuItem
const templateMenuItemDtoConverter = {
    toCreateDto: (
        entity: Partial<TemplateMenuItem>
    ): CreateTemplateMenuItemDto => ({
        displayName: entity.displayName || "",
        menuItemId: entity.menuItem?.id || 0,
        tablePosIndex: entity.tablePosIndex || 0,
        templateId: entity.parentTemplate?.id || 0,
    }),
    toUpdateDto: (
        entity: Partial<TemplateMenuItem>
    ): UpdateTemplateMenuItemDto => ({
        displayName: entity.displayName || "",
        menuItemId: entity.menuItem?.id || 0,
        tablePosIndex: entity.tablePosIndex || 0,
        templateId: entity.parentTemplate?.id || 0,
    }),
};

// Context factory functions
const createTemplateMenuItemEditContext = (
    editInstance: Partial<TemplateMenuItem> | null,
    setEditInstance: (instance: Partial<TemplateMenuItem> | null) => void
): TemplateMenuItemEditContext => ({
    setDisplayName: (name: string) => {
        setEditInstance({ ...editInstance, displayName: name });
    },
    setMenuItem: (menuItem: MenuItem) => {
        setEditInstance({ ...editInstance, menuItem });
    },
    setTablePosIndex: (index: number) => {
        setEditInstance({ ...editInstance, tablePosIndex: index });
    },
});

const createTemplateMenuItemCreateContext = (
    createInstance: Partial<TemplateMenuItem>,
    setCreateInstance: (instance: Partial<TemplateMenuItem>) => void
): TemplateMenuItemCreateContext => ({
    setDisplayName: (name: string) => {
        setCreateInstance({ ...createInstance, displayName: name });
    },
    setMenuItem: (menuItem: MenuItem) => {
        setCreateInstance({ ...createInstance, menuItem });
    },
    setTablePosIndex: (index: number) => {
        setCreateInstance({ ...createInstance, tablePosIndex: index });
    },
    setParentTemplate: (template: Template) => {
        setCreateInstance({ ...createInstance, parentTemplate: template });
    },
});

// Entity-specific mutations hook
export function useTemplateMenuItemMutations() {
    return useEntityMutations<
        TemplateMenuItem,
        CreateTemplateMenuItemDto,
        UpdateTemplateMenuItemDto,
        TemplateMenuItemEditContext,
        TemplateMenuItemCreateContext
    >({
        endpoint: "/template-menu-items",
        dtoConverter: templateMenuItemDtoConverter,
        createEditContext: createTemplateMenuItemEditContext,
        createCreateContext: createTemplateMenuItemCreateContext,
    });
}
