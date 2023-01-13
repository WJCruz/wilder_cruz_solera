import { IResponseUser } from "src/interfaces/user.interface"

export const ApiResponse = (
    message: string,
    body: any,
    extra: string
    ): IResponseUser => {
    return {
        message: message,
        content: body,
        extra: extra,
    }
}
