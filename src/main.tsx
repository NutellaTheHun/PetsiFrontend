import "bootstrap/dist/css/bootstrap.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTE } from "./app/routes/constants.ts";
import ProtectedRoute from "./app/routes/ProtectedRoute.tsx";
import { AdminView } from "./features/admin/admin.view.tsx";
import { InventoryCountView } from "./features/inventory-management/counts/inventory-count.view.tsx";
import { InventoryCountsView } from "./features/inventory-management/counts/inventory-counts.view.tsx";
import { InventoryDashboardView } from "./features/inventory-management/inventory-dashboard.view.tsx";
import { InventoryManagementView } from "./features/inventory-management/inventory-management.view.tsx";
import { InventoryItemView } from "./features/inventory-management/items/inventory-item.view.tsx";
import { InventoryItemsView } from "./features/inventory-management/items/inventory-items.view.tsx";
import { DockComponent } from "./features/login/dock/dock.view.tsx";
import { LoginComponent } from "./features/login/login/login.view.tsx";
import { LabelView } from "./features/order-management/labels/label.view.tsx";
import { LabelsView } from "./features/order-management/labels/labels.view.tsx";
import { ItemView } from "./features/order-management/menu-items/item.view.tsx";
import { ItemsView } from "./features/order-management/menu-items/items.view.tsx";
import { OrderDashboardView } from "./features/order-management/order-dashboard.view.tsx";
import { OrderManagementView } from "./features/order-management/order-management.view.tsx";
import { OrderView } from "./features/order-management/orders/order.view.tsx";
import { OrdersView } from "./features/order-management/orders/orders.view.tsx";
import { ReportsView } from "./features/order-management/reports/reports.view.tsx";
import { TemplateView } from "./features/order-management/templates/template.view.tsx";
import { TemplatesView } from "./features/order-management/templates/templates.view.tsx";
import { RecipeCostingView } from "./features/recipe-costing/recipe-costing.view.tsx";
import { RecipeDashboardView } from "./features/recipe-costing/recipe-dashboard.view.tsx";
import { RecipeView } from "./features/recipe-costing/recipe.view.tsx";
import { RecipesView } from "./features/recipe-costing/recipes.view.tsx";
import {
  AUTH_ADMIN_PANEL,
  AUTH_DOCK,
  AUTH_INVENTORY,
  AUTH_ORDERS,
  AUTH_RECIPE,
} from "./util/auth-constants.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div style={{ backgroundColor: "#40474C", minHeight: "100vh" }}>
        <Routes>
          {/** Login */}
          <Route path={ROUTE.LOGIN} element={<LoginComponent />} />
          {/** Dock */}
          <Route
            path={ROUTE.DOCK}
            element={<ProtectedRoute feature={AUTH_DOCK} />}
          >
            <Route index element={<DockComponent />} />
          </Route>
          {/** Admin Panel */}
          <Route
            path={ROUTE.ADMIN}
            element={<ProtectedRoute feature={AUTH_ADMIN_PANEL} />}
          >
            <Route index element={<AdminView />} />
          </Route>
          {/** Order Management Section */}
          <Route
            path={ROUTE.ORDER.ROOT}
            element={<ProtectedRoute feature={AUTH_ORDERS} />}
          >
            <Route element={<OrderManagementView />}>
              <Route index element={<OrderDashboardView />} />
              <Route path={ROUTE.ORDER.ORDERS} element={<OrdersView />}>
                <Route path={ROUTE.ORDER.ORDER} element={<OrderView />} />
              </Route>
              <Route path={ROUTE.ORDER.ITEMS} element={<ItemsView />}>
                <Route path={ROUTE.ORDER.ITEM} element={<ItemView />} />
              </Route>
              <Route path={ROUTE.ORDER.LABELS} element={<LabelsView />}>
                <Route path={ROUTE.ORDER.LABEL} element={<LabelView />} />
              </Route>
              <Route path={ROUTE.ORDER.TEMPLATES} element={<TemplatesView />}>
                <Route path={ROUTE.ORDER.TEMPLATE} element={<TemplateView />} />
              </Route>
              <Route path={ROUTE.ORDER.REPORTS} element={<ReportsView />} />
              <Route
                path={ROUTE.ORDER.PRINT_LABELS}
                element={<ReportsView />}
              />
            </Route>
          </Route>
          {/** Inventory Management Section */}
          <Route
            path={ROUTE.INVENTORY.ROOT}
            element={<ProtectedRoute feature={AUTH_INVENTORY} />}
          >
            <Route element={<InventoryManagementView />}>
              <Route index element={<InventoryDashboardView />} />
              <Route
                path={ROUTE.INVENTORY.COUNTS}
                element={<InventoryCountsView />}
              >
                <Route
                  path={ROUTE.INVENTORY.COUNT}
                  element={<InventoryCountView />}
                />
              </Route>
              <Route
                path={ROUTE.INVENTORY.ITEMS}
                element={<InventoryItemsView />}
              >
                <Route
                  path={ROUTE.INVENTORY.ITEM}
                  element={<InventoryItemView />}
                />
              </Route>
            </Route>
          </Route>
          {/** Recipe Costing Section */}
          <Route
            path={ROUTE.RECIPE.ROOT}
            element={<ProtectedRoute feature={AUTH_RECIPE} />}
          >
            <Route path={ROUTE.RECIPE.ROOT} element={<RecipeCostingView />}>
              <Route index element={<RecipeDashboardView />} />
              <Route path={ROUTE.RECIPE.RECIPES} element={<RecipesView />}>
                <Route path={ROUTE.RECIPE.RECIPE} element={<RecipeView />} />
              </Route>
            </Route>
          </Route>

          {/** Reroute everything else */}
          <Route path="*" element={<Navigate to={ROUTE.LOGIN} />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
