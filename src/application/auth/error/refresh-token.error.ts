import { BaseError } from "../../../error.js";

export class RefreshTokenError extends BaseError {
 private constructor(status: number, message: string) {
    super('refresh-token-error', status, message);
  }

  static InvalidToken() {
    return new RefreshTokenError(401, `invalid token`);
  }

  
}
