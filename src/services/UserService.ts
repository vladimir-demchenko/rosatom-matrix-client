import http from "../http-common";
import type { IUser } from "../types/types";

const getAll = () => {
    return http.get<IUser[]>("/user")
};

const update = (id:number, data:IUser) => {
    return http.put(`/user/${id}`, data);
};

const create = (data:IUser) => {
    return http.post<IUser>(`/user`, data);
};

const deleteUser = (id:number) => {
    return http.delete(`/user/${id}`);
};

const UserService = {
    getAll,
    update,
    create,
    deleteUser
};

export default UserService;