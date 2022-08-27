import { IUser } from './IUser';
import { IResponse } from './Response';

export interface IRegisterResponse {
    register: IRegister
}

interface IRegister extends IResponse {

    users?: IUser[];

}