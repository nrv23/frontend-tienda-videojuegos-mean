import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  @Output() eventEmiter = new EventEmitter<boolean>();
  toggleValue: boolean = true;

  toggled() {

    if(typeof this.toggleValue === "undefined") {
      this.toggleValue = true;
    } else {
      this.toggleValue = !this.toggleValue;
    }
    this.eventEmiter.emit(this.toggleValue); // este emiter es el que va enviar el valor para que el componente padre lo lea y ejecute la funcion
  }
}
