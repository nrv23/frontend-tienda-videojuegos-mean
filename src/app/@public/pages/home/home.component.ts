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

    this.user.getUsers(1,1)
      .subscribe(response => {
        console.log(response.users)
      })
    
  }
}
