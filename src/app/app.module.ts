import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,

    
  ],
  exports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
  

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }