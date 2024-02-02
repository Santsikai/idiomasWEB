import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenguajeComponent } from './lenguaje.component';
import { LenguajeRoutingModule } from './lenguaje-routing.module';



@NgModule({
  declarations: [
    LenguajeComponent
  ],
  imports: [
    CommonModule,
    LenguajeRoutingModule
  ]
})
export class LenguajeModule { }
