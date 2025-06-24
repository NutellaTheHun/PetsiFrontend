import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "../api-types";
import { getToken } from "./auth";

const fetchClient = createFetchClient<paths>({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
    querySerializer: (params) => {
        const searchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                // For arrays, add each item as a separate parameter
                value.forEach((item) => {
                    searchParams.append(key, item);
                });
            } else if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        }

        return searchParams.toString();
    },
});

export const $api = createClient(fetchClient);
