import { CategoryService } from './../../../shared/services/category.service';
import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoriesService = inject(CategoryService);
  @Input() category_id?: string;

  // constructor() {
  //   const initProducts: Product[] = [
  //     {
  //       id: Date.now(),
  //       title: 'Producto 1',
  //       price: 12,
  //       image: 'https://picsum.photos/640/640?r=2',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 2',
  //       price: 15,
  //       image: 'https://picsum.photos/640/640?r=3',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 3',
  //       price: 18,
  //       image: 'https://picsum.photos/640/640?r=4',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 4',
  //       price: 21,
  //       image: 'https://picsum.photos/640/640?r=5',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 5',
  //       price: 24,
  //       image: 'https://picsum.photos/640/640?r=6',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 6',
  //       price: 27,
  //       image: 'https://picsum.photos/640/640?r=7',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 7',
  //       price: 30,
  //       image: 'https://picsum.photos/640/640?r=8',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 8',
  //       price: 33,
  //       image: 'https://picsum.photos/640/640?r=9',
  //       creationAt: new Date().toISOString(),
  //     },
  //   ];
  //   this.products.set(initProducts);
  // }

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
