import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLenguajesComponent } from './lista-lenguajes.component';

describe('ListaLenguajesComponent', () => {
  let component: ListaLenguajesComponent;
  let fixture: ComponentFixture<ListaLenguajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLenguajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLenguajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
