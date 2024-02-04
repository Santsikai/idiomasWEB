import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaLenguajesComponent } from './lista-lenguajes.component';
import { ListaLenguajesRoutingModule } from './lista-lenguaje-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaLenguajesComponent
  ],
  imports: [
    CommonModule,
    ListaLenguajesRoutingModule,
    FormsModule
  ]
})
export class ListaLenguajesModule { }
