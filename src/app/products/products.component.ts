
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  products: any[] = [];

constructor( private http: HttpClient){
  
}
 ngOnInit(): void {
    this.getProducts();
  }
getProducts(): void {
    this.http
      .get<any>('https://dummyjson.com/products?limit=100')
      .subscribe({
        next: (response) => {
          this.products = response.products;        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
