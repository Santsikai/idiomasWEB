import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { PerfilModule } from "./perfil/perfil.module";


@NgModule({
  imports: [
    PagesRoutingModule,

  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule { }
