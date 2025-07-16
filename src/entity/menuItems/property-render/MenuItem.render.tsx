import { Checkbox, Text, TextInput } from "@mantine/core";
import type { components } from "../../../api-types";
import { Tooltip } from "../../../features/shared-components/Tooltip";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import { MantineAutoComplete } from "../../../lib/uiComponents/input/MantineAutoComplete";
import { MantineComboBox } from "../../../lib/uiComponents/input/MantineComboBox";
import { MultiSelectCheckbox } from "../../../lib/uiComponents/input/MantineMultiSelectCheckbox";
import type {
    MenuItemCategory,
    MenuItemContainerItem,
    MenuItemContainerOptions,
    MenuItemSize,
} from "../../entityTypes";

type MenuItem = components["schemas"]["MenuItem"];

export type MenuItemRenderContext = {
    setCategory: (entity: MenuItemCategory | null) => void;
    setItemName: (name: string) => void;
    setVeganOption: (entity: MenuItem | null) => void;
    setTakeNBakeOption: (entity: MenuItem | null) => void;
    setVeganTakeNBakeOption: (entity: MenuItem | null) => void;
    setValidSizes: (sizes: MenuItemSize[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
};

export interface MenuItemDataContext extends EntityDataContext<MenuItem> {
    menuItemCategories?: MenuItemCategory[];
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedCategory = (
    value: MenuItemCategory,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineComboBox<MenuItemCategory>
                totalOptions={dataContext?.menuItemCategories ?? []}
                selectedOption={value}
                onOptionChange={context.setCategory}
                labelKey={"categoryName"}
            />
        );
    }
    return <Text>{value?.categoryName ?? "No category"}</Text>;
};

const renderedItemName = (
    value: string,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setItemName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedVeganOption = (
    value: MenuItem | null,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<MenuItem>
                totalOptions={dataContext?.menuItems ?? []}
                selectedOption={value}
                onOptionChange={context.setVeganOption}
                searchProperty="itemName"
            />
        );
    }
    return <Text>{value?.itemName ?? "No vegan option"}</Text>;
};

const renderedTakeNBakeOption = (
    value: MenuItem | null,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<MenuItem>
                totalOptions={dataContext?.menuItems ?? []}
                selectedOption={value}
                onOptionChange={context.setTakeNBakeOption}
                searchProperty="itemName"
            />
        );
    }
    return <Text>{value?.itemName ?? "No take n bake option"}</Text>;
};

const renderedVeganTakeNBakeOption = (
    value: MenuItem | null,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<MenuItem>
                totalOptions={dataContext?.menuItems ?? []}
                selectedOption={value}
                onOptionChange={context.setVeganTakeNBakeOption}
                searchProperty="itemName"
            />
        );
    }
    return <Text>{value?.itemName ?? "No vegan take n bake option"}</Text>;
};

const renderedValidSizes = (
    value: MenuItemSize[],
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MultiSelectCheckbox<MenuItemSize>
                totalOptions={dataContext?.menuItemSizes ?? []}
                selectedOptions={value}
                onCheckboxChange={context.setValidSizes}
                labelKey={"name"}
            />
        );
    }

    // Create tooltip text from valid sizes
    const tooltipText = value?.length
        ? value.map((size) => size.name)
        : "No sizes available";

    return (
        <Tooltip content={tooltipText}>
            <GenericValueDisplay value={`${value?.length || 0} sizes`} />
        </Tooltip>
    );
};

const renderedIsPOTM = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => context.setIsPOTM(e.target.checked)}
            />
        );
    }
    return <Checkbox checked={value} />;
};

const renderedIsParbake = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => context.setIsParbake(e.target.checked)}
            />
        );
    }
    return <Checkbox checked={value} />;
};

// TODO: implement this
const renderedDefinedContainerItems = (
    value: MenuItemContainerItem[],
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <Text>{`${value?.length || 0} Container Items`}</Text>;
};

// TODO: implement this
const renderedContainerOptions = (
    value: MenuItemContainerOptions,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return (
        <Text>{`${value?.containerRules.length || 0} items allowed, ${
            value?.validQuantity
        } total size`}</Text>
    );
};

const renderedCreatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedUpdatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <Text>{value}</Text>;
};

export const menuItemPropertyRenderer: PropertyRendererRecord<MenuItem> = {
    id: renderedId,
    category: renderedCategory,
    itemName: renderedItemName,
    veganOption: renderedVeganOption,
    takeNBakeOption: renderedTakeNBakeOption,
    veganTakeNBakeOption: renderedVeganTakeNBakeOption,
    validSizes: renderedValidSizes,
    isPOTM: renderedIsPOTM,
    isParbake: renderedIsParbake,
    definedContainerItems: renderedDefinedContainerItems,
    containerOptions: renderedContainerOptions,
    createdAt: renderedCreatedAt,
    updatedAt: renderedUpdatedAt,
};

export type MenuItemRenderProps = {
    entityProp: keyof MenuItem;
    statefulInstance: GenericStatefulEntity<MenuItem>;
    context: MenuItemRenderContext;
    dataContext?: MenuItemDataContext;
};

export function MenuItemRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: MenuItemRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
