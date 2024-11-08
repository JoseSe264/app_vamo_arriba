import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input() images: string[] = []; // Recibe un array de URLs de imágenes

  // Opciones para el slider
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 4000, // Cambia de imagen cada 4 segundos
      disableOnInteraction: false // Continúa la reproducción después de la interacción
    },
    loop: true // Permite que el slider vuelva al principio
  };
}
