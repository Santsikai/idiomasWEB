import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,

  ],
  declarations: [
    AuthComponent,
  ],
})
export class AuthModule { }
