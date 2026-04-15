import { BaseError } from "../../../error.js";

export class AuthError extends BaseError {
 private constructor(status: number, message: string) {
    super('auth-error', status, message);
  }

  static InvalidCredentials() {
    return new AuthError(401, `invalid credentials`);
  }

  static EmailAlreadyRegistered() {
    return new AuthError(401, `Email already registered`);
  }
}
