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

export function ValidFeatures({ userRoles }: Props) {
  const dockFeatures = new Set<string>();

  userRoles.forEach((role) => {
    const roleFeatures = RoleFeatureMap[role];
    roleFeatures.forEach((f) => dockFeatures.add(f));
  });

  const features = Array.from(dockFeatures).filter((f) => f !== AUTH_DOCK);

  const featurePathNameMap: Record<string, string> = {
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
          text={featurePathNameMap[feature]}
        />
      ))}
    </>
  );
}
