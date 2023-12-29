import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface cartModel {
  imgSrc: string;
  title: string;
  amount: number;
  count: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  inCartValue = 0;
  cartList!: cartModel | null;
  positionFixed = new Subject<boolean>();

  setInCartValue = (value: number) => {
    this.inCartValue = value;
  };

  positionEmit = (value: boolean) => {
    this.positionFixed.next(value);
  };

  getInCartValue = () => {
    return this.inCartValue;
  };

  cartAdd = (cartData: cartModel) => {
    this.cartList = cartData;
  };
  clearCart = () => {
    this.cartList = null;
  };
}
