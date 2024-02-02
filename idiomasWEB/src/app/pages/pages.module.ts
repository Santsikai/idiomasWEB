import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { PerfilModule } from "./perfil/perfil.module";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule,
  ],
  declarations: [
    PagesComponent,
    
  ],
})
export class PagesModule { }
