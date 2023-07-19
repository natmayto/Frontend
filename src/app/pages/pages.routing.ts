import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

import { InventarioComponent } from './inventario/inventario.component';
import { CrearListadoInventarioComponent } from './crear-listado-inventario/crear-listado-inventario.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EventosComponent } from './eventos/eventos.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';
import { EventoComponent } from './evento/evento.component';
import { CrearReservasComponent } from './crear-reservas/crear-reservas.component';


const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Inicio' } },
          
            // { path: 'crear-listado-inventario', component: CrearListadoInventarioComponent },
            { path: 'inventario', component: InventarioComponent,  data: { titulo: 'Inventario' } },
            // { path: 'editar-producto/:id', component: InventarioComponent },
           
            //arreglar
            { path: 'crear-articulo', component: CrearArticuloComponent },
            { path: 'articulos', component: ArticulosComponent, data: { titulo: 'Articulos' } },
           
            { path: 'eventos', component: EventosComponent, data: { titulo: 'Eventos' } },
            { path: 'evento/:id', component: EventoComponent , data: { titulo: 'Eventos' } },
      
            { path: 'reservas', component: ReservasComponent, data: { titulo: 'Reservas' } },
            { path: 'crear-reservas', component: CrearReservasComponent, data: { titulo: 'Reservas' } },

            { path: 'configuracion-cuenta', component: AccountSettingsComponent },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },

        ]
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }