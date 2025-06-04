export const ROUTE = {
  LOGIN: "/login",
  DOCK: "/dock",
  ADMIN: "/admin",

  ORDER: {
    ROOT: "/ordersDash", // parent route
    DASHBOARD: "", // index route
    ORDERS: "orders",
    ORDER: "order",
    ITEMS: "items",
    ITEM: "item",
    TEMPLATES: "templates",
    TEMPLATE: "template",
    LABELS: "labels",
    LABEL: "label",
    PRINT_LABELS: "printLabels",
    REPORTS: "reports",
  },

  INVENTORY: {
    ROOT: "/inventoryDash",
    COUNTS: "inventoryCounts",
    COUNT: "inventoryCount",
    ITEMS: "inventoryItems",
    ITEM: "inventoryItem",
  },

  RECIPE: {
    ROOT: "/recipeDash",
    RECIPES: "recipes",
    RECIPE: "recipe",
  },
};
