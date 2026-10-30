
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    FooterComponent

  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  products: any[] = [];
  filterProducts :any=[]
  showProfile = false;
  userDetails: any;
  zentroUsers: any;

  constructor(private http: HttpClient, private router: Router) {

  }
  ngOnInit(): void {
    this.getProducts();

    const storedUsers = localStorage.getItem('zentroUsers');
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    if (storedUsers && loggedInEmail) {
      const users = JSON.parse(storedUsers);

      this.zentroUsers = users.find(
        (user: any) => user.email === loggedInEmail
      );
    }
  localStorage.getItem('loggedInEmail')
  }


  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  getProducts(): void {
    this.http
      .get<any>('https://dummyjson.com/products?limit=100')
      .subscribe({
        next: (response) => {
          this.products = response.products;
        this.filterProducts = [...response.products];

        },
        error: (error) => {
          console.error(error);
        }
      });
  }

 searchProduct(event: Event) {
  const value = (event.target as HTMLInputElement).value.toLowerCase();

  this.products = this.filterProducts.filter((p: any) =>
    p.title.toLowerCase().includes(value)
  );

  console.log(this.products);
}


  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');

    this.showProfile = false;

    this.router.navigate(['/login']);
  }
}

