import http from "../http-common";
import type { IAccess } from "../types/types";

const getAll = () => {
    return http.get<IAccess[]>("/access")
};

const update = (id:number, data:IAccess) => {
    return http.put(`/access/${id}`, data);
};

const create = (data:IAccess) => {
    return http.post<IAccess>(`/access`, data);
};

const deleteAccess = (id:number) => {
    return http.delete(`/access/${id}`);
};

const UserService = {
    getAll,
    update,
    create,
    deleteAccess
};

export default UserService;