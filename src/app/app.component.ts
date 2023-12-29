import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './shared/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce-product-page';
  isMobileView!: boolean;
  menuOpen!: Subscription;
  isMenuOpen!: boolean;

  constructor(private cartService: CartService) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log('innerWidth : ', window.innerWidth);
    console.log('outerwidth : ', window.outerWidth);
    if (window.innerWidth < 678 || window.outerWidth < 678) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  ngOnInit(): void {
    this.onResize();
    this.menuOpen = this.cartService.positionFixed.subscribe(
      (v) => (this.isMenuOpen = v)
    );
  }

  ngOnDestroy(): void {
    this.menuOpen.unsubscribe();
  }
}
