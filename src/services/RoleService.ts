import http from "../http-common";
import type { IRole } from "../types/types";

const getAll = () => {
    return http.get<IRole[]>("/role")
};

const update = (id:number, data:IRole) => {
    return http.put(`/role/${id}`, data);
};

const create = (data:IRole) => {
    return http.post<IRole>(`/role`, data);
};

const deleteAccess = (id:number) => {
    return http.delete(`/role/${id}`);
};

const UserService = {
    getAll,
    update,
    create,
    deleteAccess
};

export default UserService;