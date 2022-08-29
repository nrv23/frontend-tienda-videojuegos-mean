
import { ICarouselItem } from './../../../interface/ICarouselItem';
import items from '@data/carousel.json';
import products from '@data/products.json';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items : ICarouselItem[] = [];
  productsList: IProduct[];
  listOne;
  listTow;
  listTree;
  constructor() { }

  ngOnInit() {

    this.items = items;
    this.productsList = products // Traer los valores cargados en el products.json u otros
    this.listOne = this.fakeRandomProductList();
    this.listTow = this.fakeRandomProductList();
    this.listTree = this.fakeRandomProductList();
  }

  fakeRandomProductList() {

    const list = [];
    const arrayMaxLength = 4;
    const limit = this.productsList.length;

    for(let i = 0; i < arrayMaxLength; i++) {
      list.push(this.productsList[Math.floor(Math.random() * limit)])
    }

    return list;
  }
}
