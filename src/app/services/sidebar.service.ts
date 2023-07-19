import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  
 
  


  // cargarMenu() {
  //   this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  // }

  
  public menu: any[] = [
    {
      titulo: 'Opciones',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Eventos' , url: 'eventos'},
        { titulo: 'Articulos' , url: 'articulos'},
        { titulo: 'Inventario' , url: 'Inventario'},
        { titulo: 'Reservas' , url: 'reserva'},
        { titulo: 'Usuario' , url: 'usuario'},
      
      ]
    }
  ];
 

  constructor() { }
  
}
