import { JwtHelperService } from '@auth0/angular-jwt';

export class AuthHelper {

    constructor() {

    }
    private jwtHelper: JwtHelperService = new JwtHelperService();

    saveToken(token:string) {

        localStorage.setItem("token",token);
    }

    getToken() {

        return localStorage.getItem("token") || '';
    }

    expiredSession() {
        return this.jwtHelper.isTokenExpired(this.getToken());
    }

    removeToken() {
        localStorage.removeItem("token");
    }

    decodeToken(token?: string) {

        return this.jwtHelper.decodeToken(!token? this.getToken(): token);
    }
}