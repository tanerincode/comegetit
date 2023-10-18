import ping from "@functions/ping";
import getUser from "@functions/user/getUser";
import createUser from "@functions/user/createUser";
import updateUser from "@functions/user/updateUser";
import deleteUser from "@functions/user/deleteUser";

export const functions = {
    ping,
    createUser,
    getUser,
    updateUser,
    deleteUser
}