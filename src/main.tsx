import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTE } from "./app/routes/constants.ts";
import ProtectedRoute from "./app/routes/ProtectedRoute.tsx";
import { AdminPage } from "./features/admin/admin.page.tsx";
import { InventoryCountWindow } from "./features/inventory-management/counts/inventory-count.window.tsx";
import { InventoryCountsWindow } from "./features/inventory-management/counts/inventory-counts.window.tsx";
import { InventoryDashboardWindow } from "./features/inventory-management/dashboard/inventory-dashboard.window.tsx";
import { InventoryManagementPage } from "./features/inventory-management/inventory-management.page.tsx";
import { InventoryItemWindow } from "./features/inventory-management/items/inventory-item.window.tsx";
import { InventoryItemsWindow } from "./features/inventory-management/items/inventory-items.windows.tsx";
import { DockPage } from "./features/login/dock/dock.page.tsx";
import { LoginPage } from "./features/login/login/login.page.tsx";
import { LabelWindow } from "./features/order-management/labels/label.window.tsx";
import { LabelsWindow } from "./features/order-management/labels/labels.window.tsx";
import { ItemWindow } from "./features/order-management/menu-items/menu-item.window.tsx";
import { ItemsWindow } from "./features/order-management/menu-items/menu-items.window.tsx";
import { OrderDashboardWindow } from "./features/order-management/order-dashboard.window.tsx";
import { OrderManagementPage } from "./features/order-management/order-management.page.tsx";
import { OrderWindow } from "./features/order-management/orders/order.window.tsx";
import { OrdersWindow } from "./features/order-management/orders/orders.window.tsx";
import { ReportsWindow } from "./features/order-management/reports/reports.window.tsx";
import { TemplateWindow } from "./features/order-management/templates/template.window.tsx";
import { TemplatesWindow } from "./features/order-management/templates/templates.window.tsx";
import { RecipeCostingView } from "./features/recipe-costing/recipe-costing.page.tsx";
import { RecipeDashboardWindow } from "./features/recipe-costing/recipe-dashboard.window.tsx";
import { RecipeWindow } from "./features/recipe-costing/recipe.window.tsx";
import { RecipesWindow } from "./features/recipe-costing/recipes.window.tsx";
import {
    AUTH_ADMIN_PANEL,
    AUTH_DOCK,
    AUTH_INVENTORY,
    AUTH_ORDERS,
    AUTH_RECIPE,
} from "./lib/auth-constants.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div style={{ backgroundColor: "#40474C", minHeight: "100vh" }}>
                    <Routes>
                        {/** Login */}
                        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
                        {/** Dock */}
                        <Route
                            path={ROUTE.DOCK}
                            element={<ProtectedRoute feature={AUTH_DOCK} />}
                        >
                            <Route index element={<DockPage />} />
                        </Route>
                        {/** Admin Panel */}
                        <Route
                            path={ROUTE.ADMIN}
                            element={
                                <ProtectedRoute feature={AUTH_ADMIN_PANEL} />
                            }
                        >
                            <Route index element={<AdminPage />} />
                        </Route>
                        {/** Order Management Section */}
                        <Route
                            path={ROUTE.ORDER.ROOT}
                            element={<ProtectedRoute feature={AUTH_ORDERS} />}
                        >
                            <Route element={<OrderManagementPage />}>
                                <Route
                                    index
                                    element={<OrderDashboardWindow />}
                                />
                                <Route
                                    path={ROUTE.ORDER.ORDERS}
                                    element={<OrdersWindow />}
                                >
                                    <Route
                                        path={ROUTE.ORDER.ORDER}
                                        element={<OrderWindow />}
                                    />
                                </Route>
                                <Route
                                    path={ROUTE.ORDER.ITEMS}
                                    element={<ItemsWindow />}
                                >
                                    <Route
                                        path={ROUTE.ORDER.ITEM}
                                        element={<ItemWindow />}
                                    />
                                </Route>
                                <Route
                                    path={ROUTE.ORDER.LABELS}
                                    element={<LabelsWindow />}
                                >
                                    <Route
                                        path={ROUTE.ORDER.LABEL}
                                        element={<LabelWindow />}
                                    />
                                </Route>
                                <Route
                                    path={ROUTE.ORDER.TEMPLATES}
                                    element={<TemplatesWindow />}
                                >
                                    <Route
                                        path={ROUTE.ORDER.TEMPLATE}
                                        element={<TemplateWindow />}
                                    />
                                </Route>
                                <Route
                                    path={ROUTE.ORDER.REPORTS}
                                    element={<ReportsWindow />}
                                />
                                <Route
                                    path={ROUTE.ORDER.PRINT_LABELS}
                                    element={<ReportsWindow />}
                                />
                            </Route>
                        </Route>
                        {/** Inventory Management Section */}
                        <Route
                            path={ROUTE.INVENTORY.ROOT}
                            element={
                                <ProtectedRoute feature={AUTH_INVENTORY} />
                            }
                        >
                            <Route element={<InventoryManagementPage />}>
                                <Route
                                    index
                                    element={<InventoryDashboardWindow />}
                                />
                                <Route
                                    path={ROUTE.INVENTORY.COUNTS}
                                    element={<InventoryCountsWindow />}
                                >
                                    <Route
                                        path={ROUTE.INVENTORY.COUNT}
                                        element={<InventoryCountWindow />}
                                    />
                                </Route>
                                <Route
                                    path={ROUTE.INVENTORY.ITEMS}
                                    element={<InventoryItemsWindow />}
                                >
                                    <Route
                                        path={ROUTE.INVENTORY.ITEM}
                                        element={<InventoryItemWindow />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                        {/** Recipe Costing Section */}
                        <Route
                            path={ROUTE.RECIPE.ROOT}
                            element={<ProtectedRoute feature={AUTH_RECIPE} />}
                        >
                            <Route
                                path={ROUTE.RECIPE.ROOT}
                                element={<RecipeCostingView />}
                            >
                                <Route
                                    index
                                    element={<RecipeDashboardWindow />}
                                />
                                <Route
                                    path={ROUTE.RECIPE.RECIPES}
                                    element={<RecipesWindow />}
                                >
                                    <Route
                                        path={ROUTE.RECIPE.RECIPE}
                                        element={<RecipeWindow />}
                                    />
                                </Route>
                            </Route>
                        </Route>

                        {/** Reroute everything else */}
                        <Route
                            path="*"
                            element={<Navigate to={ROUTE.LOGIN} />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
