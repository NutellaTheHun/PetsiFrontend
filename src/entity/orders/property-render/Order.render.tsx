import { Checkbox, Text, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
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
import { MantineComboBox } from "../../../lib/uiComponents/input/MantineComboBox";
import { MantineSimpleComboBox } from "../../../lib/uiComponents/input/MantineSimpleComboBox";
import type {
    MenuItem,
    MenuItemSize,
    Order,
    OrderCategory,
    OrderMenuItem,
} from "../../entityTypes";

export type OrderRenderContext = {
    setRecipient: (recipient: string) => void;
    setOrderCategory: (category: OrderCategory) => void;
    setFulfillmentType: (type: string) => void;
    setFulfillmentContactName: (name: string | null) => void;
    setDeliveryAddress: (address: string | null) => void;
    setPhoneNumber: (phone: string | null) => void;
    setEmail: (email: string | null) => void;
    setNote: (note: string | null) => void;
    setIsFrozen: (frozen: boolean) => void;
    setIsWeekly: (weekly: boolean) => void;
    setWeeklyFulfillment: (day: string | null) => void;
    setFulfillmentDate: (date: string | null) => void;
    setOrderedMenuItems: (items: OrderMenuItem[]) => void;
};

export interface OrderDataContext extends EntityDataContext<Order> {
    orderCategories?: OrderCategory[];
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
    fulfillmentTypes?: string[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedOrderCategory = (
    value: OrderCategory,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext,
    dataContext?: OrderDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineComboBox<OrderCategory>
                totalOptions={dataContext?.orderCategories ?? []}
                selectedOption={value}
                onOptionChange={context.setOrderCategory}
                labelKey={"categoryName"}
            />
        );
    }
    return <Text>{value?.categoryName ?? "No Category"}</Text>;
};

const renderedRecipient = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setRecipient(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedCreatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedUpdatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedFulfillmentDate = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DateTimePicker
                value={value ? new Date(value) : null}
                onChange={(e) => context.setFulfillmentDate(e)}
                placeholder="Pick date and time"
            />
        );
    }
    return <Text>{new Date(value).toLocaleDateString()}</Text>;
};

const renderedFulfillmentType = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext,
    dataContext?: OrderDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineSimpleComboBox
                totalOptions={dataContext?.fulfillmentTypes ?? []}
                selectedOption={value}
                onOptionChange={context.setFulfillmentType}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedFulfillmentContactName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value || ""}
                onChange={(e) =>
                    context.setFulfillmentContactName(e.target.value)
                }
            />
        );
    }
    return <Text>{value || "N/A"}</Text>;
};

const renderedDeliveryAddress = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value || ""}
                onChange={(e) => context.setDeliveryAddress(e.target.value)}
            />
        );
    }
    return <Text>{value || "N/A"}</Text>;
};

const renderedPhoneNumber = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value || ""}
                onChange={(e) => context.setPhoneNumber(e.target.value)}
            />
        );
    }
    return <Text>{value || "N/A"}</Text>;
};

const renderedEmail = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value || ""}
                onChange={(e) => context.setEmail(e.target.value)}
            />
        );
    }
    return <Text>{value || "N/A"}</Text>;
};

const renderedNote = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Textarea
                value={value || ""}
                onChange={(e) => context.setNote(e.target.value)}
            />
        );
    }
    return <Text>{value || "No notes"}</Text>;
};

const renderedIsFrozen = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => context.setIsFrozen(e.target.checked)}
            />
        );
    }
    return <Checkbox checked={value} />;
};

const renderedIsWeekly = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => context.setIsWeekly(e.target.checked)}
            />
        );
    }
    return <Checkbox checked={value} />;
};

const renderedWeeklyFulfillment = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineSimpleComboBox
                totalOptions={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ]}
                selectedOption={value}
                onOptionChange={context.setWeeklyFulfillment}
            />
        );
    }
    return <GenericValueDisplay value={value || "No day selected"} />;
};

// TODO: Implement this
const renderedOrderedItems = (
    value: OrderMenuItem[],
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext,
    dataContext?: OrderDataContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} items`} />;
};

export const orderPropertyRenderer: PropertyRendererRecord<Order> = {
    id: renderedId,
    orderCategory: renderedOrderCategory,
    recipient: renderedRecipient,
    createdAt: renderedCreatedAt,
    updatedAt: renderedUpdatedAt,
    fulfillmentDate: renderedFulfillmentDate,
    fulfillmentType: renderedFulfillmentType,
    fulfillmentContactName: renderedFulfillmentContactName,
    deliveryAddress: renderedDeliveryAddress,
    phoneNumber: renderedPhoneNumber,
    email: renderedEmail,
    note: renderedNote,
    isFrozen: renderedIsFrozen,
    isWeekly: renderedIsWeekly,
    weeklyFulfillment: renderedWeeklyFulfillment,
    orderedItems: renderedOrderedItems,
};

export type OrderRenderProps = {
    entityProp: keyof Order;
    statefulInstance: GenericStatefulEntity<Order>;
    context: OrderRenderContext;
    dataContext?: OrderDataContext;
};

export function OrderRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: OrderRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
