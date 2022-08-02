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

    
  constructor(private userService: UserService) {
  
   }
  private helper: AuthHelper =  new AuthHelper();

  loginForm: LoginForm = {
    email: "",
    password: ""
  };

  ngOnInit(): void {
    
    if(!this.helper.expiredSession()) {
      console.log("No está expirada")
    } else {
      console.log(" está expirada")

    }
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
          basicAlert("success", "Login", message, "Ok", true);
        } else {

          basicAlert("warning", "Login", message, "OK", true);
        }
      }, (err: Error) => {
        console.log(err.message);

        basicAlert("error", "Login", "Hubo un error", "OK", true);

      })
  }

  

}
