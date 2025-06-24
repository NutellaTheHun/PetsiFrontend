# Generic Entity Hook

This directory contains a generic entity hook (`useGenericEntity`) that provides a consistent pattern for all entity hooks in the application. It handles common functionality like sorting, searching, filtering, pagination, and CRUD operations.

## Features

-   **Consistent API**: All entity hooks follow the same pattern
-   **Type Safety**: Full TypeScript support with proper typing
-   **Flexible Configuration**: Support for different entity capabilities
-   **Dynamic State Management**: Built-in state management for sorting, searching, and filtering
-   **CRUD Operations**: Automatic generation of create, update, and delete mutations
-   **Custom Property Names**: Configurable return property names to match existing APIs

## Basic Usage

### Simple Entity Hook

```typescript
import type { components } from "../api-types";
import { useGenericEntity } from "./useGenericEntity";

type InventoryArea = components["schemas"]["InventoryArea"];

export interface UseInventoryAreasOptions {
    relations?: (keyof InventoryArea)[];
    limit?: number;
    offset?: string;
}

export function useInventoryAreas(options: UseInventoryAreasOptions = {}) {
    return useGenericEntity<InventoryArea>(
        {
            endpoint: "/inventory-areas",
            defaultSortKey: "areaName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryAreas",
            createPropertyName: "createArea",
            updatePropertyName: "updateArea",
            deletePropertyName: "deleteArea",
        },
        options
    );
}
```

### Entity Hook with Search and Filters

```typescript
export function useInventoryItems(options: UseInventoryItemsOptions = {}) {
    return useGenericEntity<InventoryItem>(
        {
            endpoint: "/inventory-items",
            defaultSortKey: "itemName",
            defaultSortDirection: "ASC",
            supportsSearch: true,
            supportsFilters: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryItems",
            createPropertyName: "createInventoryItem",
            updatePropertyName: "updateInventoryItem",
            deletePropertyName: "deleteInventoryItem",
        },
        options
    );
}
```

### Entity Hook with Date Filtering

```typescript
import type { DateQueryParams } from "./useGenericEntity";

export interface UseOrdersOptions extends DateQueryParams {
    relations?: (keyof Order)[];
    limit?: number;
    offset?: string;
}

export function useOrders(options: UseOrdersOptions = {}) {
    return useGenericEntity<Order, UseOrdersOptions>(
        {
            endpoint: "/orders",
            defaultSortKey: "id",
            defaultSortDirection: "DESC",
            supportsSearch: true,
            supportsFilters: true,
            supportsDateFiltering: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "orders",
            createPropertyName: "createOrder",
            updatePropertyName: "updateOrder",
            deletePropertyName: "deleteOrder",
        },
        options
    );
}
```

## Configuration Options

### EntityConfig Interface

```typescript
interface EntityConfig<T, TOptions extends BaseQueryParams = BaseQueryParams> {
    endpoint: string; // API endpoint (e.g., "/inventory-areas")
    defaultSortKey: string; // Default sort field
    defaultSortDirection?: "ASC" | "DESC"; // Default sort direction
    supportsSearch?: boolean; // Enable search functionality
    supportsFilters?: boolean; // Enable filter functionality
    supportsDateFiltering?: boolean; // Enable date filtering
    supportsCreate?: boolean; // Enable create mutation
    supportsUpdate?: boolean; // Enable update mutation
    supportsDelete?: boolean; // Enable delete mutation
    customQueryParams?: (options: TOptions, dynamicParams: any) => any;
    customReturnValues?: (data: any, mutations: any, dynamicState: any) => any;
    itemsPropertyName?: string; // Custom name for items array
    createPropertyName?: string; // Custom name for create mutation
    updatePropertyName?: string; // Custom name for update mutation
    deletePropertyName?: string; // Custom name for delete mutation
}
```

## Return Values

The hook returns an object with the following properties:

### Common Properties

-   `items` (or custom name): Array of entities
-   `nextCursor`: Pagination cursor
-   `isLoading`: Loading state
-   `error`: Error state

### Sorting

-   `sortKey`: Current sort field
-   `setSortKey`: Function to change sort field
-   `sortDirection`: Current sort direction ("ASC" | "DESC")
-   `setSortDirection`: Function to change sort direction

### Search and Filters (if enabled)

-   `search`: Current search term
-   `setSearch`: Function to update search term
-   `filters`: Current filters array
-   `setFilters`: Function to update filters

### Date Filtering (if enabled)

-   `startDate`: Start date filter
-   `setStartDate`: Function to update start date
-   `endDate`: End date filter
-   `setEndDate`: Function to update end date
-   `dateBy`: Date field to filter by
-   `setDateBy`: Function to update date field

### CRUD Operations (if enabled)

-   `createItem` (or custom name): Create mutation
-   `updateItem` (or custom name): Update mutation
-   `deleteItem` (or custom name): Delete mutation

## Usage in Components

```typescript
function InventoryAreasList() {
    const {
        inventoryAreas,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createArea,
        updateArea,
        deleteArea,
    } = useInventoryAreas({
        relations: ["category"],
        limit: 50,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={() => setSortKey("areaName")}>
                Sort by Name
            </button>
            <button onClick={() => setSortDirection("DESC")}>
                Reverse Sort
            </button>

            {inventoryAreas.map(area => (
                <div key={area.id}>
                    {area.areaName}
                    <button onClick={() => updateArea.mutate({ id: area.id, data: {...} })}>
                        Edit
                    </button>
                    <button onClick={() => deleteArea.mutate({ id: area.id })}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
```

## Migration Guide

To migrate an existing entity hook to use the generic hook:

1. **Import the generic hook**:

    ```typescript
    import { useGenericEntity } from "./useGenericEntity";
    ```

2. **Remove existing imports**:

    ```typescript
    // Remove these imports
    import { useQueryClient } from "@tanstack/react-query";
    import { useState } from "react";
    import { $api } from "../lib/app-client";
    ```

3. **Replace the hook implementation** with a configuration object:

    ```typescript
    export function useYourEntity(options: UseYourEntityOptions = {}) {
        return useGenericEntity<YourEntity>(
            {
                endpoint: "/your-endpoint",
                defaultSortKey: "yourDefaultSortField",
                defaultSortDirection: "ASC",
                supportsSearch: true, // if needed
                supportsFilters: true, // if needed
                supportsDateFiltering: true, // if needed
                supportsCreate: true, // if needed
                supportsUpdate: true, // if needed
                supportsDelete: true, // if needed
                itemsPropertyName: "yourEntities", // custom name
                createPropertyName: "createYourEntity", // custom name
                updatePropertyName: "updateYourEntity", // custom name
                deletePropertyName: "deleteYourEntity", // custom name
            },
            options
        );
    }
    ```

4. **Update the options interface** to remove redundant properties:
    ```typescript
    export interface UseYourEntityOptions {
        relations?: (keyof YourEntity)[];
        limit?: number;
        offset?: string;
        // Remove sortBy, sortOrder, search, filters if they were static
    }
    ```

## Advanced Usage

### Custom Query Parameters

```typescript
export function useInventoryAreaCounts(
    options: UseInventoryAreaCountsOptions = {}
) {
    return useGenericEntity<InventoryAreaCount>(
        {
            endpoint: "/inventory-area-counts",
            defaultSortKey: "id",
            defaultSortDirection: "DESC",
            supportsSearch: true,
            supportsDateFiltering: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            customQueryParams: (options, dynamicParams) => {
                // Build filters array based on selectedAreaId
                const filters: string[] = [];
                if (options.selectedAreaId) {
                    filters.push(`inventoryArea=${options.selectedAreaId}`);
                }

                return {
                    ...dynamicParams,
                    filters: filters.length > 0 ? filters : undefined,
                };
            },
            itemsPropertyName: "inventoryAreaCounts",
            createPropertyName: "createInventoryAreaCount",
            updatePropertyName: "updateInventoryAreaCount",
            deletePropertyName: "deleteInventoryAreaCount",
        },
        options
    );
}
```

### Custom Return Values

```typescript
export function useCustomEntity(options: UseCustomEntityOptions = {}) {
    return useGenericEntity<CustomEntity>(
        {
            endpoint: "/custom-entities",
            defaultSortKey: "id",
            supportsCreate: true,
            customReturnValues: (data, mutations, dynamicState) => ({
                // Custom return structure
                entities: data?.items ?? [],
                totalCount: data?.totalCount ?? 0,
                customSortKey: dynamicState.sortKey,
                customCreate: mutations.createItem,
                // Add any additional properties
            }),
        },
        options
    );
}
```

## Benefits

1. **Consistency**: All entity hooks follow the same pattern
2. **Maintainability**: Changes to common functionality only need to be made in one place
3. **Type Safety**: Full TypeScript support with proper typing
4. **Flexibility**: Easy to configure for different entity needs
5. **Reduced Boilerplate**: Significantly less code in individual entity hooks
6. **Automatic State Management**: Built-in state management for common operations
