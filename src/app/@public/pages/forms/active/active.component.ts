import { UserService } from 'src/app/@core/services/auth/user.service';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  constructor(private route: ActivatedRoute, private user: UserService, private router: Router) { }
  private token: string;

  activeUser = {
    password: "",
    confirm_password: "",
    birthDate: ""
  };

  ngOnInit(): void {
    
    //asigna una fecha por default que tenga un diferencia de 18 años con el día actual
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.activeUser.birthDate = data.toISOString().substring(0,10);


    this.route.params.subscribe(params => {
      if(params.token) {
        this.token = params.token;
      }
    })
  }

  dateAsign(event: NgbDateStruct) { // esta funcion recibe la fecha qye el picker envia

    const year = event.year;
    const month = this.formatDate(event.month)
    const day = this.formatDate(event.day);

    this.activeUser.birthDate = year.toString() + '-' + month + '-' + day;
  }

  private formatDate(date: number | string)  {
    return (+date < 10)? `0${date}` : date;  
  }

  activate() {

    if(this.activeUser.password !== this.activeUser.confirm_password) {
      // mostrar mensaje
      basicAlert("warning","Activar Usuario","La confirmación del password no es válida","",true);
      
    } else {

      // se envia la peticion

      this.user.activeUser(this.activeUser.birthDate,this.activeUser.password,this.token)
        .subscribe(response => {
            const { activeUser:{ status, message } } = response;

            if(status) {
              basicAlert("success","Activar Usuario",message,"",true);    
              this.router.navigate(["login"]) 
            } else {
              basicAlert("warning","Activar Usuario",message,"",true);
            }

        }, (error:Error) => {
          basicAlert("error","Activar Usuario",error.message,"",true);
        } )
    }

  }  
}
