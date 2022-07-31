import { UserService } from '../../../@core/services/auth/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
    console.log("cargando")
    this.user.login("nrv2391@gmail.com","hola1234")
    .subscribe(response => {
     
    },err => {
      console.log(err);
    })

    this.user.getMe()
      .subscribe(response => {
        console.log(response.me);
      }, err => {
        console.log(err.message);
      })

  }
}
