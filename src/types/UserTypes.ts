import {User} from "@entities/User";

export interface UserResponse {
    name: string;
    email: string;
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
        created_at: user.created_at,
        updated_at: user.updated_at
    }
}