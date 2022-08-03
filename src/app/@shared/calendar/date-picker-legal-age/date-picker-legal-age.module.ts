import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerLegalAgeComponent } from './date-picker-legal-age.component';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DatePickerLegalAgeComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule // agregar este modulo para poder trabajar con los formularios de angular
  ],
  exports: [
    DatePickerLegalAgeComponent
  ]
})
export class DatePickerLegalAgeModule { }
