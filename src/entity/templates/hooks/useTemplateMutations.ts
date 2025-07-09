import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateTemplateDto,
    Template,
    UpdateTemplateDto,
} from "../../entityTypes";

export type TemplateEditContext = {
    setTemplateName: (name: string) => void;
    setIsPie: (isPie: boolean) => void;
};

export type TemplateCreateContext = {
    setTemplateName: (name: string) => void;
    setIsPie: (isPie: boolean) => void;
};

// DTO converter for Template
const templateDtoConverter = {
    toCreateDto: (entity: Partial<Template>): CreateTemplateDto => ({
        templateName: entity.templateName || "",
        isPie: entity.isPie || false,
    }),
    toUpdateDto: (entity: Partial<Template>): UpdateTemplateDto => ({
        templateName: entity.templateName || "",
        isPie: entity.isPie || false,
    }),
};

// Context factory functions
const createTemplateEditContext = (
    editInstance: Partial<Template> | null,
    setEditInstance: (instance: Partial<Template> | null) => void
): TemplateEditContext => ({
    setTemplateName: (name: string) => {
        setEditInstance({ ...editInstance, templateName: name });
    },
    setIsPie: (isPie: boolean) => {
        setEditInstance({ ...editInstance, isPie });
    },
});

const createTemplateCreateContext = (
    createInstance: Partial<Template>,
    setCreateInstance: (instance: Partial<Template>) => void
): TemplateCreateContext => ({
    setTemplateName: (name: string) => {
        setCreateInstance({ ...createInstance, templateName: name });
    },
    setIsPie: (isPie: boolean) => {
        setCreateInstance({ ...createInstance, isPie });
    },
});

// Entity-specific mutations hook
export function useTemplateMutations() {
    return useEntityMutations<
        Template,
        CreateTemplateDto,
        UpdateTemplateDto,
        TemplateEditContext,
        TemplateCreateContext
    >({
        endpoint: "/templates",
        dtoConverter: templateDtoConverter,
        createEditContext: createTemplateEditContext,
        createCreateContext: createTemplateCreateContext,
    });
}
