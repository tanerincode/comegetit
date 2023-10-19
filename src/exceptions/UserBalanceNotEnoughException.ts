export class UserBalanceNotEnoughException extends Error {
    constructor(message?: string) {
        let messageEx = (message) ?? "User not enough balance. Please check user balance."
        super(messageEx);
        this.name = "UserBalanceNotEnoughException";
    }
}