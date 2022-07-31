import { IUser } from './IUser';
import { IResponse } from './Response';

export interface IUsers extends IResponse {
    users: IUser[]
}