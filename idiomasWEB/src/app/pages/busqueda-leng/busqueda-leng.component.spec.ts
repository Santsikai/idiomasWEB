import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaLengComponent } from './busqueda-leng.component';

describe('BusquedaLengComponent', () => {
  let component: BusquedaLengComponent;
  let fixture: ComponentFixture<BusquedaLengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaLengComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaLengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
