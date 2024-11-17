import { Request } from "express";

export interface IUserData {
    name: string;
    username: string;
    email?: string | null;
    password: string;
    role: "superAdmin" | "admin" | "user";
    isActive: boolean;
}

export interface IRequestWithUser extends Request {
    userId: string;
    file: any;
}

export interface IRequestData extends Request {
    userId: string;
    file: any;
    files: any;
}
