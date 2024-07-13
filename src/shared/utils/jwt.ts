import jwt from 'jsonwebtoken';
import { IUser } from 'api/usersApi';

interface IPayload {
  user: IUser;
  expire: string;
  type: 'refreshToken' | 'accessToken';
}

const secret_key: string = 'secret_key';

export class JWT {
  static parseToken(token: string): IPayload {
    return jwt.verify(token, secret_key) as IPayload;
  }
}
