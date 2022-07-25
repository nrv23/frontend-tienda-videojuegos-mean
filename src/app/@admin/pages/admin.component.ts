import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {
  toogledMenu: boolean = true;
  toggled($event: boolean) {
    this.toogledMenu = $event;
  }
}


