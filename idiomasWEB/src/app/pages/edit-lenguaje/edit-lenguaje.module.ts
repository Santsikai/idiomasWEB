import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLenguajeComponent } from './edit-lenguaje.component';
import { EditLenguajeRoutingModule } from './edit-lenguaje-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditLenguajeComponent
  ],
  imports: [
    CommonModule,
    EditLenguajeRoutingModule,
    FormsModule
  ]
})
export class EditLenguajeModule { }
