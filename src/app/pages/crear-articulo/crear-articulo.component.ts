import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/models/articulo';
import { Usuario } from 'src/app/models/usuario';
import { ArticulosService } from 'src/app/services/articulos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: [ './crear-articulo.component.css'
  ]
})
export class CrearArticuloComponent {

  public formSubmitted = false;
  public perfilForm: FormGroup;
  registerForm: FormGroup<any>;
  public articulos:  Articulo[] = [];
  public cargar: boolean = true;

  constructor( public articuloService: ArticulosService, private fb: FormBuilder,  private router: Router){
   
    this.registerForm = fb.group({
      producto: ['', [ Validators.required]],
      cantidad: ['', [Validators.required] ],
      descripcion: [''],
    });

  }

  refresh(): void {
    window.location.reload();
  }

  
  cerrarModal(){
    this.articuloService.cerrarModal();
  }


  abrirModal(){
    this.articuloService.abrirModal();
  }

  cargarArticulo(){
    this.cargar = true;
  
     this.articuloService.cargarArticulo()
                        .subscribe( articulos  => {
                          this.cargar = false;
                          this.articulos = articulos;
                        })
    }


 
 crearArticulo(){
  this.formSubmitted = true;
console.log(this.registerForm.value);

if ( this.registerForm.valid ) {
 console.log('posteando form');
//Posteo
this.articuloService.crearArticulo( this.registerForm.value )
.subscribe( (response) => {
     this.articuloService.cargarArticulo();
       Swal.fire('Listado registrado', '','success');
}, 
(err) => {
    Swal.fire('Error', err.error.msg, 'error');
});
} else {
  console.log('form incorrecto');
}    

}

//////////////////////////////////////////
/////////////////////////////////////////

campoNoValido( campo: string ): boolean {
if ( this.registerForm.get(campo).invalid && this.formSubmitted){
  return true;
} else {
  return false;
}
}


}





