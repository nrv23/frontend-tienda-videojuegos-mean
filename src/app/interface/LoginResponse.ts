import { IResponse } from './Response';
export interface ILogin extends IResponse {
    token? : string;
}