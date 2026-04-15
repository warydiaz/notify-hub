import { BaseError } from "../../../error.js";

export class UserError extends BaseError {
 private constructor(status: number, message: string) {
    super('user-error', status, message);
  }

  static InvalidUser() {
    return new UserError(401, `User not found`);
  }
}
