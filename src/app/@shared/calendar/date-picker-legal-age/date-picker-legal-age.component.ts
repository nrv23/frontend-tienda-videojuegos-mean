import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent implements OnInit {

  constructor() { }

  @Output() datePickerData = new EventEmitter<NgbDateStruct>();
   // este valor lee la fecha que se selecciona del datePicker y se envia en la propiedad
  // de tipo output al componente registro

  currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate() + 1
  }
  // los rangos de edad van a ser de 18 a 100 años
  minDate: NgbDateStruct = {
    year: this.currentDate.year - 100,
    month: this.currentDate.month,
    day: this.currentDate.day
  };
  
  maxDate: NgbDateStruct = {
    year: this.currentDate.year - 18,
    month: this.currentDate.month,
    day: this.currentDate.day
  };
  model: NgbDateStruct = this.maxDate; // asginar la fecha actual que tiene como default 18 años de diferencia

  ngOnInit(): void {

  }

  selectedDateRange() {

    this.datePickerData.emit(this.model);
  }

 

}
