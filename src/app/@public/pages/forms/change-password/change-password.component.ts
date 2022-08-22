import { basicAlert } from 'src/app/@shared/alerts/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/auth/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private user: UserService, private router: Router) { }
  private token: string;

  passData = {
    password: "",
    confirm_password: "",
  };

  ngOnInit(): void {
    

    this.route.params.subscribe(params => {
      if(params.token) {
        this.token = params.token;
        console.log(this.token)
      }
    })
  }
  resetPassword(event: Event) {

    event.preventDefault();

    if(this.passData.password !== this.passData.confirm_password ) {
      basicAlert("warning", "Cambiar contraseña","Las contraseñas no son iguales","Ok",true);
    } else {
      // enviar la peticion

      this.user.changePassword(this.token, this.passData.password)
        .subscribe(response => {
          const { resetPassword: {
            status,
            message
          } } = response;

          if(status) {
            basicAlert("success", "Cambiar contraseña",message,"Ok",true);
            this.router.navigate(["login"]);
          } else {
            basicAlert("warning", "Cambiar contraseña",message,"Ok",true);
          }

      },(err: Error) => {
        basicAlert("error", "Cambiar contraseña",err.message,"Ok",true);
      })
    }

  }
}
