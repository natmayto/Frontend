import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ArchivosService } from 'src/app/services/archivos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public tempImg: any = null ;

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private archivosService: ArchivosService ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email , [ Validators.required, Validators.email ] ],
    });

 }
    actualizacionPerfil() {
      this.usuarioService.actualizacionPerfil( this.perfilForm.value )
                                  .subscribe( () => {
                                    const { nombre, email } = this.perfilForm.value;
                                  this.usuario.nombre = nombre;
                                  this.usuario.email = email;

                                  Swal.fire('Perfil modificado correctamente', '', 'success');
                                  }, (err) => {
                                    Swal.fire('Error al modificar perfil', err.error.msg , 'error');
                                  });
    }

  cambioImagen( file: File ) : any {
   
   this.imagenSubir = file;

   if ( !file ){
    return this.tempImg = null;
   }

   const leer = new FileReader();
   leer.readAsDataURL ( file );

   leer.onloadend = () => {
    this.tempImg = leer.result;
   }
   
  }

  subirImagen(){
    this.archivosService.actualizacionFoto( this.imagenSubir, 'usuario', this.usuario.uid )
                                                                        .then( 
                                                                          img => {this.usuario.img = img;
                                                                          Swal.fire('Imagen modificada correctamente', '', 'success');
                                                                          }).catch( err => {
                                                                            Swal.fire('Error al modificar la imagen', err.error.msg , 'error');
                                                                           })
  }

}

