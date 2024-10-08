export interface Product {
  id?: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  categoria: string;
  precio: number;
  status: 'Disponible' | 'Bajo Stock' | 'Agotado';
  imagenUrl?: string;  // Opcional
}