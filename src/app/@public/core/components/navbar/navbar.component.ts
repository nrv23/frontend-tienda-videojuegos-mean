import { UserService } from 'src/app/@core/services/auth/user.service';
import { LoginComponent } from './../../../pages/forms/login/login.component';
import { Component, OnInit } from '@angular/core';
import { IMe } from 'src/app/interface/MeResponse';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private user:UserService) { }
  session: IMe;
  access= false;
  role:string;

  ngOnInit(): void {
    console.log("carga 2")

    this.user.accessVar$.subscribe(response => {
      console.log(response);

      this.session = response;
      this.access = response.me.status;
    })
  }

}
