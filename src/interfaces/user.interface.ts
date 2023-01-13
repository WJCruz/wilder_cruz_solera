import { User } from "src/entity/user";

export interface ICreateUser {
    user: string,
    password: string,
    full_name: string,
}

export interface IResponseUser {
    message: string,
    content: User[],
    extra: string
}

export interface IResponseUserNull {
    message: string,
    content: null,
    extra: string
}

export interface IResponseController {
    message:string,
    content: User[]
}

export interface GetUsersInterface {
    message: string,
    content: User[],
    extra: string
}

export interface ObjectUserInterface {
    message: string,
    content: User,
    extra: string
}

export interface DeleteUserInterface{
    message: string,
    content: null,
    extra: string
}

export interface IUserFullName{
    fullName: string
}