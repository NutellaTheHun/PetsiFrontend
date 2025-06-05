import { FeaturePathMap, RoleFeatureMap } from "../../../../app/constants";
import {
  AUTH_ADMIN_PANEL,
  AUTH_DOCK,
  AUTH_INVENTORY,
  AUTH_ORDERS,
  AUTH_RECIPE,
} from "../../../../util/auth-constants";
import { DockItem } from "./DockItem";

type Props = { userRoles: string[] };

/**
 * Given a list of a users roles, returns {@link DockItem} for each page the user has permissions to access.
 * - Staff role returns 1 valid dock item: Order Management
 * - Manager role returns 3 dock items: Order Management, Recipe Costing, Inventory Management
 * - Admin role returns 4 dock items: Order Management, Recipe Costing, Inventory Management, Admin Panel
 */
export function ValidDockItems({ userRoles }: Props) {
  const validPages = new Set<string>();

  userRoles.forEach((role) => {
    const roleAccess = RoleFeatureMap[role];
    roleAccess.forEach((p) => validPages.add(p));
  });

  const features = Array.from(validPages).filter((p) => p !== AUTH_DOCK);

  const AuthPageNameMap: Record<string, string> = {
    [AUTH_ORDERS]: "Order Managment",
    [AUTH_INVENTORY]: "Inventory Management",
    [AUTH_RECIPE]: "Recipe Costing",
    [AUTH_ADMIN_PANEL]: "Admin Panel",
  };

  return (
    <>
      {features.map((feature) => (
        <DockItem
          key={feature}
          linkTo={FeaturePathMap[feature]}
          text={AuthPageNameMap[feature]}
        />
      ))}
    </>
  );
}
