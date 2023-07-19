import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-reservas',
  templateUrl: './crear-reservas.component.html',
  styleUrls: ['./crear-reservas.component.css']
})
export class CrearReservasComponent {

  public formSubmitted = false;
  public perfilForm: FormGroup;
  registerForm: FormGroup<any>;
  public reservas:  Reserva[] = [];
  public cargar: boolean = true;

  constructor( public reservaService: ReservasService, private fb: FormBuilder,  private router: Router){
   
    this.registerForm = fb.group({
      nombre: ['', [ Validators.required]],
      fecha: ['', [Validators.required] ],
      descripcion: [''],
    });

  }

  refresh(): void {
    window.location.reload();
  }
  
  cerrarModal(){
    this.reservaService.cerrarModal();
  }


  abrirModal(){
    this.reservaService.abrirModal();
  }

  cargarArticulo(){
    this.cargar = true;
  
     this.reservaService.cargarReserva()
                        .subscribe( reservas  => {
                          this.cargar = false;
                          this.reservas = reservas;
                        })
    }


 
 crearReserva(){
  this.formSubmitted = true;
console.log(this.registerForm.value);

if ( this.registerForm.valid ) {
 console.log('posteando form');
//Posteo
this.reservaService.crearReserva( this.registerForm.value )
.subscribe( (response) => {
     this.reservaService.cargarReserva();
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
