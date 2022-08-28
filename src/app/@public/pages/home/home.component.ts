import { ICarouselItem } from './../../../interface/ICarouselItem';
import { Component, OnInit } from '@angular/core';
import data from '@data/carousel.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.items = data;
  }
}
