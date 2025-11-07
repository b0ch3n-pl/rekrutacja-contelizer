import axios from "axios";

export const api = axios.create({
    baseURL: "https://gorest.co.in/public/v2",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GOREST_TOKEN}`,
    },
});
