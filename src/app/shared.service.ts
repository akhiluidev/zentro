import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router: Router) {}

  viewProduct(id: number): void {
    this.router.navigate(['/product-details', id]);
  }

}