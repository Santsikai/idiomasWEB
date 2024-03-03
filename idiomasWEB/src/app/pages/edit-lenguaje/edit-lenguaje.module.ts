import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLenguajeComponent } from './edit-lenguaje.component';
import { EditLenguajeRoutingModule } from './edit-lenguaje-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    EditLenguajeComponent
  ],
  imports: [
    CommonModule,
    EditLenguajeRoutingModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class EditLenguajeModule { }
