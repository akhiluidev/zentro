
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = null;
  loading: boolean = true;

  // Product UI Properties
  selectedImage: string = '';
  quantity: number = 1;
  isWishlisted: boolean = false;
  selectedTab: string = 'description';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Get Product ID from URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getProductDetails(id);
    } else {
      this.loading = false;
    }

  }

  // Get Single Product Details
  getProductDetails(id: string): void {

    this.loading = true;

    this.http.get(`https://dummyjson.com/products/${id}`)
      .subscribe({

        next: (res: any) => {

          this.product = res;
          this.loading = false;

          // Set First Product Image
          this.selectedImage =
            this.product.images?.[0] || this.product.thumbnail;

          // Reset Quantity
          this.quantity = 1;

          console.log('Product Details:', this.product);

        },

        error: (err) => {

          console.error('Product API Error:', err);

          this.product = null;
          this.loading = false;

        }

      });

  }

  // Back to Products Page
  goBack(): void {
    this.router.navigate(['/products']);
  }

  // Select Product Image
  selectImage(image: string): void {
    this.selectedImage = image;
  }

  // Increase Quantity
  increaseQuantity(): void {

    if (this.quantity < this.product.stock) {
      this.quantity++;
    }

  }

  // Decrease Quantity
  decreaseQuantity(): void {

    if (this.quantity > 1) {
      this.quantity--;
    }

  }

  // Add or Remove Wishlist
  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }

}
