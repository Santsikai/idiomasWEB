import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { PerfilModule } from "./perfil/perfil.module";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";


@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [
    PagesComponent,
    
  ],
  
})
export class PagesModule { }
