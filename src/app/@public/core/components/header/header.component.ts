import { UserService } from 'src/app/@core/services/auth/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private user:UserService) { }

  ngOnInit(): void {
 
  }

}
