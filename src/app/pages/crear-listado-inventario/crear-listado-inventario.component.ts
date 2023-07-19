
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventario } from 'src/app/models/inventario';

import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-listado-inventario',
  templateUrl: './crear-listado-inventario.component.html',
  styleUrls: ['./crear-listado-inventario.component.css']
})
export class CrearListadoInventarioComponent implements OnInit{

  public formSubmitted = false;
  public perfilForm: FormGroup;
  registerForm: FormGroup<any>;
  inventario: Inventario[];
  public cargar: boolean = true;

  constructor( public inventarioService : InventarioService, private fb: FormBuilder,  private router: Router){

    this.registerForm = fb.group({
      nombre: ['', [ Validators.required]],
      cantidad: ['', [Validators.required] ],
      descripcion: [''],
    });

  }

  refresh(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.cargarInventario();
  }

  cerrarModal(){
    this.inventarioService.cerrarModal();
  }


  abrirModal(){
    this.inventarioService.abrirModal();
  }

  cargarInventario(){
    this.cargar = true;
  
     this.inventarioService.cargarInventario()
                        .subscribe( inventario  => {
                          this.cargar = false;
                          this.inventario = inventario;
                        })
    }

//método push se puede recargar
async crearInventario(){
  this.formSubmitted = true;
console.log(this.registerForm.value);

if ( this.registerForm.valid ) {
 console.log('posteando form');
//Posteo
this.inventarioService.crearInventario( this.registerForm.value )
.subscribe( response => {
       Swal.fire('Listado registrado', '','success');  
       this.cargarInventario();   
}, 
(err) => {
    Swal.fire('Error', err.error.msg, 'error');
  }
);
} else {
  console.log('form incorrecto');
}          
}


campoNoValido( campo: string ): boolean {
if ( this.registerForm.get(campo).invalid && this.formSubmitted){
  return true;
} else {
  return false;
}
}



}