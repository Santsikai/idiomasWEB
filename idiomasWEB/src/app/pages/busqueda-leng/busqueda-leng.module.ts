import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaLengComponent } from './busqueda-leng.component';
import { BusquedaLengRoutingModule } from './busqueda-leng-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BusquedaLengComponent
  ],
  imports: [
    CommonModule,
    BusquedaLengRoutingModule,
    FormsModule
  ]
})
export class BusquedaLengModule { }
