import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  emptyCart = 'Your cart is empty.';
  cartEmpty = true;
  imgSrc!: string;
  title!: string;
  count!: number;
  amount!: number;
  total!: number;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    if (this.cartService.cartList) {
      this.cartEmpty = false;
      this.imgSrc = this.cartService.cartList.imgSrc;
      this.title = this.cartService.cartList.title;
      this.count = this.cartService.cartList.count;
      this.amount = this.cartService.cartList.amount;
      this.total = this.amount * this.count;
    } else {
      this.cartEmpty = true;
    }
  }

  onClickDelete = () => {
    this.cartService.clearCart();
    if (!this.cartService.cartList) {
      this.cartEmpty = true;
    }
  };
}
