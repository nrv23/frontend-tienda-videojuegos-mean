import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/@core/services/auth/user.service';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private route: Router) { }

  ngOnInit(): void {
    //asigna una fecha por default que tenga un diferencia de 18 años con el día actual
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.register.birthDate = data.toISOString().substring(0,10);

  }

  register:User = new User("","","","","","","");

  dateAsign(event: NgbDateStruct) { // esta funcion recibe la fecha qye el picker envia

    const year = event.year;
    const month = this.formatDate(event.month)
    const day = this.formatDate(event.day);

    this.register.birthDate = year.toString() + '-' + month + '-' + day;
  }

  add(event: Event) {
    
    event.preventDefault();

    if(this.register.password !== this.register.confirm_password) {

      basicAlert("warning","Registro","La confirmación del password no es válida","",true);
      return;
    }
    //aquí enviar el formulario para el registro
    this.register.active = true;
    this.userService.register(this.register)
      .subscribe(response => {
        if(!response.register.status) {
          basicAlert("warning","Registro",response.register.message,"",true);
        } else {
          basicAlert("success","Registro",response.register.message,"",true);
          this.route.navigate(["/login"]);
        }
      }, err => {
        basicAlert("error","Registro","Hubo un error inesperado","",true);
      })
  }

  private formatDate(date: number | string)  {
    return (+date < 10)? `0${date}` : date;  
  }
}
