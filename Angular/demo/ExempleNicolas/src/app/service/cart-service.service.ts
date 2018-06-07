import { Injectable } from '@angular/core';
import { Product } from '../bean/product';
import {Cart} from '../cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public cart: Array<Product>;

  constructor() { }

  public addProductsCart(p_product:Product){
    this.cart.push(p_product);
  }

}
