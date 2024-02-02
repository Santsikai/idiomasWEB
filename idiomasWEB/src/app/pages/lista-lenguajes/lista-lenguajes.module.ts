import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaLenguajesComponent } from './lista-lenguajes.component';
import { ListaLenguajesRoutingModule } from './lista-lenguaje-routing.module';



@NgModule({
  declarations: [
    ListaLenguajesComponent
  ],
  imports: [
    CommonModule,
    ListaLenguajesRoutingModule
  ]
})
export class ListaLenguajesModule { }
