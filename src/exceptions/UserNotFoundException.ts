export class UserNotFoundException extends Error {
    constructor(message?: string) {
        let messageEx = (message) ?? "User not found. Please check your credentials."
        super(messageEx);
        this.name = "UserNotFoundException";
    }
}