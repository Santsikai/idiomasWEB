import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenguajeComponent } from './lenguaje.component';
import { LenguajeRoutingModule } from './lenguaje-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LenguajeComponent
  ],
  imports: [
    CommonModule,
    LenguajeRoutingModule,
    FormsModule
  ]
})
export class LenguajeModule { }
