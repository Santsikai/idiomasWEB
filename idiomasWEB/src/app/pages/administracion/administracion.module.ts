import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { AdministracionRoutingModule } from './administracion-routing.module';



@NgModule({
  declarations: [
    AdministracionComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
