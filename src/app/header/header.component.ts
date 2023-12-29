import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isMobileView!: boolean;
  menuOn!: boolean;
  constructor(private dialog: MatDialog, private cartService: CartService) {}
  menuList = ['Collections', 'Men', 'Women', 'About', 'Contact'];
  openDialog(): void {
    let cartData = {};
    if (this.isMobileView) {
      cartData = {
        hasBackdrop: true,
        position: {
          top: '80px',
        },
        width: '95%',
        panelClass: 'custom-dialog',
      };
    } else {
      cartData = {
        hasBackdrop: true,
        position: { top: '6%', right: '10%' },
        panelClass: 'custom-dialog',
      };
    }
    this.dialog.open(CartComponent, cartData);
  }

  onClickMenu = () => {
    this.menuOn = !this.menuOn;
    this.cartService.positionEmit(this.menuOn);
  };
}
