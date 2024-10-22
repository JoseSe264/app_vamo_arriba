import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>; // Usamos un Observable

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Obtenemos los productos al iniciar el componente
    this.products$ = this.productService.getProducts();
  }

  // Eliminar producto
  removeProduct(id: string): void {
    this.productService.removeProduct(id); // Llama al servicio para eliminar el producto
    console.log('Producto eliminado'); // Maneja el log después de la llamada
  }
}
