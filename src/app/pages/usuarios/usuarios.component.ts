import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { BuscarService } from 'src/app/services/buscar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit{

  public usuariosTotales: number = 0;
  public usuarios: Usuario[] = [];
  public usuarioTemp: Usuario[] = [];

  public desde: number= 0;
  public cargando: boolean = true;


  constructor(private usuarioService: UsuarioService, private buscarService: BuscarService){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

 cargarUsuario(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total, usuarios}) => {
      this.usuariosTotales = total;
      if(usuarios.length !== 0){
        this.usuarios = usuarios;
        this.usuarioTemp = usuarios;
      }
      this.cargando = false;
    })
  }
 
  cambiopagina( valor: number ){
      this.desde += valor;

      if(this.desde < 0){
        this.desde=0;
      } else if (this.desde > this.usuariosTotales){
        this.desde-=valor;
      }

      this.cargarUsuario();
  }

//en archivos y perfil los tipos son en singular, pero en buscar y usuarios es en plural
buscar ( termino: string) {

  if(termino.length === 0){
    return this.usuarios = this.usuarioTemp;
  }

  this.buscarService.buscar( 'usuarios', termino )
          .subscribe(resp => {
           this.usuarios = resp;
});

}


eliminacionUsuario ( usuario: Usuario ){
console.log(this.usuarioService.uid)
  if( usuario.uid === this.usuarioService.uid){
    return Swal.fire('Error', 'No puede eliminarse a sí mismo','error');
  }

  Swal.fire({
    title: '¿Seguro que desea eliminar el usuario?',
    text: `Se borrará el usuario ${ usuario.nombre }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Eliminar'

  }).then((result) => {
    if (result.value) {


     this.usuarioService.eliminacionUsuario(usuario)
     .subscribe( resp =>{
      this.cargarUsuario();
      Swal.fire('Usuario eliminado', `${usuario.nombre} ha sido eliminado correctamente`, 'success');
     });
}
  });
}
}

