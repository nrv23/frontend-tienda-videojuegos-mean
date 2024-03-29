import { ShoppingCartHelper } from './../../../../utils/shoppingCart';
import { Router } from '@angular/router';
import { IMe } from './../../../../interface/MeResponse';
import { LoginForm } from '../../../../interface/LoginForm';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/auth/user.service';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { AuthHelper } from 'src/app/utils/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    
  constructor(private userService: UserService, private router: Router) {
  
   }
  private helper: AuthHelper =  new AuthHelper();
  private shoppingCartHelper: ShoppingCartHelper = new ShoppingCartHelper();

  loginForm: LoginForm = {
    email: "",
    password: ""
  };



  ngOnInit(): void {
    
    
  }

  login(e: Event) {

    e.preventDefault();

    this.userService.login(this.loginForm.email, this.loginForm.password)
      .subscribe(response => {

        const {
          login: { status, message, token }
        } = response;

        if (status && token) { // se ha iniciado sesion

          this.helper.saveToken(token);
          this.userService.start();
          basicAlert("success", "Login", message, "Ok", true);
          // preguntar si hay alguna ruta para redireccionar
          const route = this.shoppingCartHelper.getRouteAfterLogin();
          
          this.router.navigate([route? route : "/"]);
          this.shoppingCartHelper.deleteRouteAfterLogin();
          
          return;
        } else {

          basicAlert("warning", "Login", message, "OK", true);
        }
      }, (err: Error) => {
        console.log(err.message);

        basicAlert("error", "Login", "Hubo un error", "OK", true);

      })
  }

  

}
