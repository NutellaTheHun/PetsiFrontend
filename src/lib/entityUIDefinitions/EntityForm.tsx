import type {
    BaseCreateContext,
    BaseEditContext,
    BaseEntity,
    UseEntityMutationsReturn,
} from "../entityHookTemplates/UseEntityMutations";

export interface EntityFormProps<
    T extends BaseEntity,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    useEntityMutation: UseEntityMutationsReturn<
        T,
        TEditContext,
        TCreateContext
    >;
}
