import { basicAlert } from 'src/app/@shared/alerts/toast';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/auth/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  emailValue: string = "";

  sendEmail(e: Event) {

    e.preventDefault();


    this.user.resetPasswordEmail(this.emailValue)
      .subscribe(response => {
        const { resetPasswordEmail: { status, message } } = response;

        if(status) {
          basicAlert("success","Resetear contraseña",message,"Ok",true);
        } else {

          basicAlert("warning","Resetear contraseña",message,"Ok",true);

        }
      }, (err: Error) => {
        basicAlert("error","Resetear contraseña",err.message,"Ok",true);
      })
    
  }
}
