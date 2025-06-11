import { FeaturePathMap, RoleFeatureMap } from "../../../../app/constants";
import { ROUTE } from "../../../../app/routes/constants";
import { getUserRoles } from "../../../../lib/auth";
import { AUTH_DOCK } from "../../../../lib/auth-constants";

export function handleLoginNavigation() {
    const validFeatures = new Set<string>();

    const roles: string[] = getUserRoles();
    if (!roles || roles.length === 0) {
        throw new Error();
    }

    roles.forEach((role: string) => {
        RoleFeatureMap[role]?.forEach((feature) => validFeatures.add(feature));
    });

    const features = Array.from(validFeatures).filter((f) => f !== AUTH_DOCK);

    if (features.length === 1) {
        window.location.href = FeaturePathMap[features[0]];
    } else {
        window.location.href = ROUTE.DOCK;
    }
}
