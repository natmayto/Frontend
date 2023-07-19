import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  public menuItems: any = [];


  constructor( public sidebarService: SidebarService,
               public usuarioService: UsuarioService) {
   
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
   
 
  }

  ngOnInit(): void {
  }

}
