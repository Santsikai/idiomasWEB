import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaLengComponent } from './busqueda-leng.component';
import { BusquedaLengRoutingModule } from './busqueda-leng-routing.module';



@NgModule({
  declarations: [
    BusquedaLengComponent
  ],
  imports: [
    CommonModule,
    BusquedaLengRoutingModule
  ]
})
export class BusquedaLengModule { }
