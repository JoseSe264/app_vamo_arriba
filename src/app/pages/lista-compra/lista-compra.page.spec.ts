import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListasPage } from './lista-compra.page';

describe('ListasPage', () => {
  let component: ListasPage;
  let fixture: ComponentFixture<ListasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
