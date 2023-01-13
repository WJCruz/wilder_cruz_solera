import { Equal, FindOptionsWhere } from "typeorm";
import bcrypt from "bcrypt"

import { User } from "../entity/user";
import { ICreateUser, IUserFullName } from "../interfaces/user.interface";
import { AppDataSource } from "../db";
import { UserDto, FilterUserDto } from "../dto/user.dto";

const UserRepository = AppDataSource.getRepository(User);

export class UserService {
    constructor() {};

    /* Obtenemos todos los usuarios */
    async getUsersService(): Promise<User[]> {
        try {
            return await UserRepository.find()
        } catch (error) {
            throw error;
        }
    }
    
    /* Obtenemos al usuario según su id */
    async getUserService(id: string): Promise<User | null> {
        try {
            const getUser: User | null = await UserRepository.findOneBy({ id: parseInt(id) });
            return getUser
        } catch (error) {
            throw error;
        }
    }

    /* Obtenemos el fullname del usuario según su username y su password */
    async getUserName(params: FilterUserDto): Promise<IUserFullName | null> {
        try {
            if(params?.user && params?.password) {
                const where: FindOptionsWhere<User> = {};
                const { user, password } = params;
                where.username = Equal(user);
                const result: User | null = await UserRepository.findOne({ where })
                if (result) {
                    const newResult = await this.comparePassword(password, result?.password ?? "")
                    if (newResult) return { fullName: result.fullname}
                }
            }
            return null
        } catch (error) {
            throw error;
        }
    }

    /* Creamos un nuevo usuario */
    async createUsersService(data: ICreateUser): Promise<User> {
        try {
            data.password = await this.encryptPassword(data.password)
            return await UserRepository.save(data);
        } catch (error) {
            throw error;
        }
    };

    /* Actualizamos al usuario según su id */
    async updateUserService(id: string, payload: UserDto): Promise<User | null>{
        try {
            const updateUser: User | null = await UserRepository.findOneBy({ id: parseInt(id) });

            if(updateUser) {
                UserRepository.merge(updateUser, payload);
                return await UserRepository.save(updateUser)
            }
            return null;
        } catch (error) {
            throw error
        }
    };

    /* Eliminamos al usuario según su id */
    async deleteUserService(id: string): Promise<true | false>{
        try {
            const deletedUser = await UserRepository.delete({ id: parseInt(id) })

            if(deletedUser.affected === 0){
                return false
            }
            return true;
        } catch (error) {
            throw error
        }
    };

    /* Método para encriptar el password */
    private async encryptPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds)
    }

    /* Método para desencriptar el password */
    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}