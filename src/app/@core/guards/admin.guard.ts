import { IUser } from './../../interface/IUser';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthHelper } from 'src/app/utils/auth';



@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {

  constructor(private router: Router) {

  }

  private helper: AuthHelper = new AuthHelper();

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if(!this.helper.expiredSession()) {
        
      const token = this.helper.decodeToken();
      const tokenData = token.user as IUser;

      if(tokenData.role === "ADMIN") {
        return true;
      }

      return false;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
