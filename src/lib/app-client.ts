import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "../api-types";
import { getToken } from "./auth";

const fetchClient = createFetchClient<paths>({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export const $api = createClient(fetchClient);
