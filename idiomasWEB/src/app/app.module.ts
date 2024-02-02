import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { ListaLenguajesComponent } from './pages/lista-lenguajes/lista-lenguajes.component';
import { EjercicioComponent } from './pages/ejercicio/ejercicio.component';
import { EditLenguajeComponent } from './pages/edit-lenguaje/edit-lenguaje.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    ListaLenguajesComponent,
    EjercicioComponent,
    EditLenguajeComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
