import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLenguajeComponent } from './edit-lenguaje.component';

describe('EditLenguajeComponent', () => {
  let component: EditLenguajeComponent;
  let fixture: ComponentFixture<EditLenguajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLenguajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLenguajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
