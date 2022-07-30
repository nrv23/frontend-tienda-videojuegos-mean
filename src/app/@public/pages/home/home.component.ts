import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {

    this.user.login("nrv2391@gmail.com","123456")
      .subscribe(response => {
        console.log(response);
      })
  }

}
