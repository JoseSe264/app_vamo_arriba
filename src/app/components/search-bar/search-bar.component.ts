import { Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <ion-searchbar 
      (ionInput)="onInput($event)" 
      class="bobstrap-searchbar"
      [placeholder]="placeholder">
    </ion-searchbar>
  `,
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Buscar'; // Valor predeterminado
  @Output() searchTermChanged = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermChanged.emit(inputElement.value);
  }
}