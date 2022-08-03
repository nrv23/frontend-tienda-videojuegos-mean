import { UserService } from 'src/app/@core/services/auth/user.service';
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
  name: string;

  ngOnInit(): void {

    this.user.accessVar$.subscribe(response => {

      const { me: {users:[{name,lastName,role}],status} } = response;
      
      this.session = response;
      this.access = status;
      this.role = role;
      this.name = `${name} ${lastName}`;
    })
  }


  logout() {
    
    this.user.resetSession();

    this.session = null;
    this.access = false;
    this.role = "";
    this.name = "";
  
  }

}
