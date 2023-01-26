import http from "../http-common";
import type { IResource } from "../types/types";

const getAll = () => {
    return http.get<IResource[]>("/resource")
};

const update = (id:number, data:IResource) => {
    return http.put(`/resource/${id}`, data);
};

const create = (data:IResource) => {
    return http.post<IResource>(`/resource`, data);
};

const deleteAccess = (id:number) => {
    return http.delete(`/resource/${id}`);
};

const UserService = {
    getAll,
    update,
    create,
    deleteAccess
};

export default UserService;