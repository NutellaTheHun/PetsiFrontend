import "bootstrap/dist/css/bootstrap.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { RecipeView } from "./features/recipe-costing/recipe.view.tsx";
import { RecipesView } from "./features/recipe-costing/recipes.view.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div style={{ backgroundColor: "#40474C" }}>
        <div className="container text-center">
          <div className="row"> </div>
          <div className="row">
            <div className="col"> </div>
            <div className="col">
              <Routes>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/dock" element={<DockComponent />} />
                <Route path="/ordersDash" element={<OrderManagementView />}>
                  <Route index element={<OrderDashboardView />} />
                  <Route path="/orders" element={<OrdersView />}>
                    <Route path="/order" element={<OrderView />} />
                  </Route>
                  <Route path="/items" element={<ItemsView />}>
                    <Route path="/item" element={<ItemView />} />
                  </Route>
                  <Route path="/labels" element={<LabelsView />}>
                    <Route path="/label" element={<LabelView />} />
                  </Route>
                  <Route path="/templates" element={<TemplatesView />}>
                    <Route path="/template" element={<TemplateView />} />
                  </Route>
                  <Route path="/reports" element={<ReportsView />} />
                  <Route path="/printLabels" element={<ReportsView />} />
                </Route>
                <Route
                  path="/inventoryDash"
                  element={<InventoryManagementView />}
                >
                  <Route index element={<InventoryDashboardView />} />
                  <Route
                    path="/inventoryCounts"
                    element={<InventoryCountsView />}
                  >
                    <Route
                      path="/inventoryCount"
                      element={<InventoryCountView />}
                    />
                  </Route>
                  <Route
                    path="/inventoryItems"
                    element={<InventoryItemsView />}
                  >
                    <Route
                      path="/inventoryItem"
                      element={<InventoryItemView />}
                    />
                  </Route>
                </Route>
                <Route path="/recipeDash" element={<RecipeCostingView />}>
                  <Route path="/recipes" element={<RecipesView />}>
                    <Route path="/recipe" element={<RecipeView />} />
                  </Route>
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
            <div className="col"> </div>
          </div>
          <div className="row"> </div>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
