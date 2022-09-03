import { UserService } from './../../@core/services/auth/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.start();
  }

}
