import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar>
  `,
})
export class SearchBarComponent {
  @Output() searchTermChanged = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermChanged.emit(inputElement.value); // Emitir el valor del input como string
  }
}
