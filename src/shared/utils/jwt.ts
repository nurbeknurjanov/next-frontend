import * as jose from 'jose';
import { IUser } from 'api/usersApi';

interface IJWTPayload {
  user: IUser;
  expire: string;
  type: 'refreshToken' | 'accessToken';
}

const secret_key: string = 'secret_key';

export class JWT {
  static async parseToken(token: string): Promise<IJWTPayload> {
    const parsed = await jose.jwtVerify<IJWTPayload>(
      token,
      new TextEncoder().encode(secret_key)
    );

    return parsed.payload;
  }
}
