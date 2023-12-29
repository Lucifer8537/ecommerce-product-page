import { Component, Input } from '@angular/core';
import { CartService } from '../shared/cart.service';
export interface cartModel {
  imgSrc: string;
  title: string;
  amount: number;
  count: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @Input() isMobileView!: boolean;
  cartValue = 0;
  displayImageList = [
    '../../assets/image-product-1.jpg',
    '../../assets/image-product-2.jpg',
    '../../assets/image-product-3.jpg',
    '../../assets/image-product-4.jpg',
  ];
  displayImage = '../../assets/image-product-1.jpg';
  displayThumbnailList: { src: string; select: boolean }[] = [
    { src: '../../assets/image-product-1-thumbnail.jpg', select: true },
    { src: '../../assets/image-product-2-thumbnail.jpg', select: false },
    { src: '../../assets/image-product-3-thumbnail.jpg', select: false },
    { src: '../../assets/image-product-4-thumbnail.jpg', select: false },
  ];
  imgClick!: boolean;

  constructor(private cartService: CartService) {}

  onClickThumbnail = (index: number) => {
    this.displayImage = this.displayImageList[index];
    this.displayThumbnailList.forEach((t, i) => {
      if (i === index) {
        t.select = true;
      } else {
        t.select = false;
      }
    });
  };

  onMobImageChange = (pos: string) => {
    let index = this.displayImageList.findIndex((i) => i === this.displayImage);
    let newIndex = 0;
    if (pos === 'left') {
      newIndex = index === 0 ? this.displayImageList.length - 1 : index - 1;
    } else {
      newIndex = index === this.displayImageList.length - 1 ? 0 : index + 1;
    }
    this.displayImage = this.displayImageList[newIndex];
    this.onClickThumbnail(newIndex);
  };

  onCarValueChange = (action: string) => {
    if (action === '-' && this.cartValue > 0) {
      this.cartValue--;
    } else if (action === '+') {
      this.cartValue++;
    }
  };

  onClickAddCart = () => {
    if (this.cartValue > 0) {
      const cart: cartModel = {
        amount: 125,
        count: this.cartValue,
        imgSrc: '../../../assets/image-product-1-thumbnail.jpg',
        title: 'Fall Limited Edition Sneakers',
      };
      this.cartService.cartAdd(cart);
    }
  };

  displayImageClick = () => {
    this.imgClick = !this.imgClick;
  };
}
