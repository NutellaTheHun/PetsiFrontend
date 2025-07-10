import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { Role } from "../../../entityTypes";
import {
    type RoleCreateContext,
    type RoleEditContext,
} from "../../hooks/useRoleMutations";
import { RoleRender } from "../../property-render/Role.render";

export interface RoleListGroupProps
    extends Omit<
        EntityListGroupContext<Role, RoleEditContext, RoleCreateContext>,
        "renderProperty"
    > {
    data: Role[];
    useEntityMutation: UseEntityMutationsReturn<
        Role,
        RoleEditContext,
        RoleCreateContext
    >;
    externalSelectedState: [Role | null, (e: Role | null) => void];
}

export function RoleListGroup(props: RoleListGroupProps) {
    return (
        <EntityListGroupFactory<Role, RoleEditContext, RoleCreateContext>
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <RoleRender
                        entityProp="roleName"
                        statefulInstance={item}
                        context={
                            item.state === "create"
                                ? props.useEntityMutation.createContext
                                : props.useEntityMutation.editContext
                        }
                    />
                );
            }}
        />
    );
}
