
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products = [
    {
      name: 'Urban Sneakers',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      inventoryStatus: 'Bestseller'
    },
    {
      name: 'Wireless Headphones',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      inventoryStatus: 'Popular'
    },
    {
      name: 'Classic Wrist Watch',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      inventoryStatus: 'New'
    },
    {
      name: 'Everyday Backpack',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      inventoryStatus: 'Bestseller'
    },
    {
      name: 'Casual T-Shirt',
      price: 699,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      inventoryStatus: 'Popular'
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
    switch (status) {
      case 'Bestseller':
        return 'success';
      case 'Popular':
        return 'info';
      case 'New':
        return 'warn';
      default:
        return 'danger';
    }
  }
}
