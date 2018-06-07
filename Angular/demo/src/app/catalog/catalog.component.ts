import { Component, OnInit } from '@angular/core';
import {Product, PRODUCT_MOCK} from '../bean/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public catalog: Array<Product>;
  public zigounette:string;
  public price:number;
  
  constructor() {
    this.catalog = PRODUCT_MOCK;
    this.zigounette = "";
    this.price = 0;
  }

  ngOnInit() {
  }

}
