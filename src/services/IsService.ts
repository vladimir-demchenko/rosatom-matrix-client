import http from "../http-common";
import type { Iis } from "../types/types";

const getAll = () => {
    return http.get<Iis[]>("/is")
};

const update = (id:number, data:Iis) => {
    return http.put(`/is/${id}`, data);
};

const create = (data:Iis) => {
    return http.post<Iis>(`/is`, data);
};

const deleteAccess = (id:number) => {
    return http.delete(`/is/${id}`);
};

const UserService = {
    getAll,
    update,
    create,
    deleteAccess
};

export default UserService;