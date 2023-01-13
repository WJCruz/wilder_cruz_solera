import { Request, Response } from "express";
import { User } from "../entity/user";
import { DeleteUserInterface, GetUsersInterface, IUserFullName, IResponseUser, IResponseUserNull, IResponseController, ObjectUserInterface } from "../interfaces/user.interface";
import { UserService } from "../providers/user.service";
import { ApiResponse } from "../response/user.response";
import { FilterUserDto } from "../dto/user.dto";
import type * as E from 'express';

const Service = new UserService();

export class UserController {
    constructo() {}

    /* Obtenemos un array de usuarios más la respuesta según si hay o no usuarios */
    async getUsers(req: Request, res: Response):Promise<E.Response<GetUsersInterface>> {
        try{
          const getUsers: User[] = await Service.getUsersService();
          let response: IResponseController | null;
  
          if(getUsers.length ===0 ) {
            response = ApiResponse("No users found", getUsers, "");
            return res.status(403).json(response);
          }
          response = ApiResponse("Users were obtained", getUsers, "");
          return res.json(response)
        } catch(error) {
          return res.status(500).json({ message: error.message });
        }
    };

    /* Obteneos al usuario según id con la respuesta según encontró o no al usuario */
    async getUser(req: Request, res: Response):Promise<E.Response<ObjectUserInterface>> {
        try{
            const getUser: User | null = await Service.getUserService(req.params.id);
            let response: IResponseUser

            if(!getUser) {
                response = ApiResponse("The user has not been found", {}, "");
                return res.status(404).json(response)
                }
            response = ApiResponse("User was obtained", getUser, "")
            return res.json(response)
  
        } catch(error) {
          return res.status(500).json({ message: error.message });
        }
    };

    /* Obtenemos al usuario según su username y password */
    async getUserName( req: Request, res: Response): Promise<E.Response<ObjectUserInterface>> {
        try {
            const body: FilterUserDto = req.body
            const getUserName: IUserFullName | null = await Service.getUserName(body);
            let response: IResponseController | null;

            if(!getUserName) {
                response = ApiResponse("The user has not been found or has not entered the correct credentials", {}, "");
                return res.status(404).json(response)
            }
            response = ApiResponse("User was obtained", getUserName, "");
            return res.json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    /* Creamos al usuario y obtenemos respuesta de que se creó con éxito */
    async createUsers(req: Request, res: Response):Promise<E.Response<ObjectUserInterface>> {
        try{
            const createUser: User = await Service.createUsersService(req.body);
            const response: IResponseController = ApiResponse("User was created", createUser, "");
            return res.json(response)
        } catch(error) {
            return res.status(500).json({ message: error.message });
        };
    };

    /* Obtenemos respuesta del usuario actualizado según su id */
    async updateUsers(req: Request, res: Response):Promise<E.Response<ObjectUserInterface>> {
        try{
            const updatedUser: User | null = await Service.updateUserService(req.params.id, req.body);
            let response: IResponseUser | IResponseUserNull;

            if(!updatedUser) {
                response = ApiResponse("The user has not been found", {}, "");
                return res.status(404).json(response)
            }
            response = ApiResponse("User was updated", updatedUser, "")
            return res.json(response)
        } catch(error) {
            return res.status(500).json({ message: error.message });
        };
    };

    /* Obtenemos confirmación de que se eliminó el usuario según su id */
    async deleteUsers(req: Request, res: Response):Promise<E.Response<DeleteUserInterface>> {
        try{
            const deletedUser: true | false = await Service.deleteUserService(req.params.id);
            let response: IResponseUser;

            if(!deletedUser) {
                response = ApiResponse("The user has not been found", {}, "");
                return res.status(404).json(response)
            }
            response = ApiResponse(`Removed user with id = ${req.params.id}`, deletedUser, "");
            return res.json(response)
        } catch(error) {
            return res.status(500).json({ message: error.message });
        };
    };
}