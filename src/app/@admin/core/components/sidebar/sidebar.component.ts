import { IMenu } from 'src/app/interface/IMenu';
import { Component, OnInit } from '@angular/core';
import menu from '@data/menus/admin.json';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: IMenu[] = [];

  ngOnInit(): void {

    this.menuItems = menu;
  }

}
