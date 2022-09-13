import { IUser } from './../../../../interface/IUser';
import { Router } from '@angular/router';
import { UserService } from './../../../../@core/services/auth/user.service';
import { IMe } from './../../../../interface/MeResponse';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private user: UserService, private router: Router) {
    this.user.accessVar$.subscribe((data) => {
      if (!data.me.status) {
        // ir a login
        return this.router.navigate(['/login']);
      } else {
        this.meData = data;
        this.auth = data.me.users[0];
      }
    });
  }

  auth: IUser = {
    id: null,
    name: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    birthDate: '',
    registerDate: '',
  };
  meData: IMe;

  ngOnInit(): void {
    this.user.start();
  }
}
