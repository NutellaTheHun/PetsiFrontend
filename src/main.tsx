import "bootstrap/dist/css/bootstrap.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { InventoryManagementView } from "./features/inventory-management/inventory-management.view.tsx";
import { DockComponent } from "./features/login/dock/dock.view.tsx";
import { LoginComponent } from "./features/login/login/login.view.tsx";
import { ItemView } from "./features/order-management/item-view.tsx";
import { ItemsView } from "./features/order-management/items-view.tsx";
import { LabelView } from "./features/order-management/label-view.tsx";
import { LabelsView } from "./features/order-management/labels-view.tsx";
import { OrderManagementView } from "./features/order-management/order-management.view.tsx";
import { OrderView } from "./features/order-management/order-view.tsx";
import { OrdersView } from "./features/order-management/orders-view.tsx";
import { ReportsView } from "./features/order-management/reports-view.tsx";
import { TemplateView } from "./features/order-management/template-view.tsx";
import { TemplatesView } from "./features/order-management/templates-view.tsx";
import { RecipeCostingView } from "./features/recipe-costing/recipe-costing.view.tsx";

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
                </Route>
                <Route
                  path="/inventory"
                  element={<InventoryManagementView />}
                />
                <Route path="/recipe" element={<RecipeCostingView />} />
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
