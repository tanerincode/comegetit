import {User} from "@entities/User";

export interface UserResponse {
    name: string;
    email: string;
    balance: number,
    created_at: Date;
    updated_at?: Date;
}

export interface UserDTO {
    name?: string;
    email?: string;
    password?: string;
}

export async function prepareUserForResponse(user:User):Promise<UserResponse> {
    return {
        name: user.name,
        email: user.email,
        balance: (user.userBalance?.balance) ?? 0.0,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
}