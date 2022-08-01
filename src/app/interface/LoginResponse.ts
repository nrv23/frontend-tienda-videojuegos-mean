import { IResponse } from './Response';
export interface ILogin {
    login: ResponseLogin
}

interface ResponseLogin extends IResponse {

    token?: string;
}