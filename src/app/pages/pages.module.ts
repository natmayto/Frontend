import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from 'src/pipes/pipes.module';
import { EventosComponent } from './eventos/eventos.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ReservasComponent } from './reservas/reservas.component';
import { CrearListadoInventarioComponent } from './crear-listado-inventario/crear-listado-inventario.component';
import { InventarioComponent } from './inventario/inventario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';
import { EventoComponent } from './evento/evento.component';
import { CrearReservasComponent } from './crear-reservas/crear-reservas.component';


@NgModule({
  declarations: [
  DashboardComponent,
  PagesComponent,
  AccountSettingsComponent,
  InventarioComponent,
  EventosComponent,
  ArticulosComponent,
  ReservasComponent,
  CrearListadoInventarioComponent,
  UsuariosComponent,
  PerfilComponent,
  CrearArticuloComponent,
  EventoComponent,
  CrearReservasComponent,

    


  ],
  exports: [
    DashboardComponent,
    ReactiveFormsModule ,
    EventosComponent,
    ArticulosComponent,
    ReservasComponent,
    CrearListadoInventarioComponent,
    InventarioComponent,
    PagesComponent,
    AccountSettingsComponent,
    UsuariosComponent,
    PerfilComponent,
    FormsModule,
    CrearArticuloComponent,
    EventoComponent,
    CrearReservasComponent,
    
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    PipesModule,
    ModalModule.forRoot(),
    
   ]
})
export class PagesModule { }
