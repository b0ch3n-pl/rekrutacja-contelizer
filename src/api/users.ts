import { api } from "./client";

export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

export const getUsers = async (query: string = ""): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users", {
        params: query ? { name: query } : {},
    });
    return data;
};

export const updateUser = async (user: Partial<User> & { id: number }) => {
    const { data } = await api.put(`/users/${user.id}`, user);
    return data;
};
