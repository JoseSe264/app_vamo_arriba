import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioCasaPage } from './inventario-casa.page';

describe('InventarioCasaPage', () => {
  let component: InventarioCasaPage;
  let fixture: ComponentFixture<InventarioCasaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioCasaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
