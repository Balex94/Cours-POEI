import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Product } from '../bean/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product:Product;
  public cart:Product[];
  private service:CartService;

  constructor( p_service:CartService ) { 
    this.product = new Product();
    this.service = p_service;
    this.cart = new Array<Product>();
  }

  ngOnInit() {
  }

}
