export interface Product {
  id?: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  categoria: string;
  fechaExpiracion: Date;
  precio: number;
  status: 'Disponible' | 'Bajo Stock' | 'Agotado';
  imagenUrl?: string;  
}