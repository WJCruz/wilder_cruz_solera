import { IsOptional, IsString } from 'class-validator'

export class UserDto {
    @IsString()
    user: string

    @IsString()
    password: string

    @IsString()
    full_name: string
}

export class FilterUserDto {
    @IsOptional()
    user: string

    @IsOptional()
    password: string
}