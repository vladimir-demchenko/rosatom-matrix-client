export interface IPosition {
    id: number;
    name: string;
}

export interface IUser {
    id: number;
    personalId: number | undefined;
    surname: string;
    name: string;
    lastname: string;
    phone: number | undefined;
    email: string;
    position: string;
    subdivision: string;
    department: string;
    status: number | undefined;
    comment: string;
}

export interface IAccess {
    id: number;
    dateRequest: Date;
    document: string;
    name: number;
    personalId: number;
    IS: number;
    resource: number;
    role: number;
    typeOfAccess: string;
    comment: string;
    disableAccess: string;
    dateDisableAccess: Date;
}

export interface Iis {
    id: number;
    name: string;
}

export interface IResource {
    id: number;
    name: string;
    idIS: number | undefined;
}

export interface IRole {
    id: number;
    name: string;
    idResource: number | undefined;
}