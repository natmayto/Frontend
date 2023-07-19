import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent  {

  public formSubmitted = false;
  registerForm: FormGroup<any>;




/*
public registerForm  = new FormGroup({
  nombre: new FormControl ('Fernando', [ Validators.required]),
  email: new FormControl ('test100@gmail.com', [ Validators.required, Validators.email]),
  password: new FormControl ('12345678', [ Validators.required, Validators.minLength(8)]),
  password2: new FormControl ('12345678', [ Validators.required, Validators.minLength(8)]),
  terminos: new FormControl (true, [ Validators.required]),
 
}, validators: this.clavesIguales('password', 'password2') 
);
*/

  constructor(private usuarioService: UsuarioService, private router: Router, fb: FormBuilder ){

      this.registerForm = fb.group({
        nombre: ['123', [ Validators.required]],
        email: ['123@gmail.com', [Validators.required, Validators.email] ],
        password: ['12345678', [Validators.required, Validators.minLength(8)] ],
        password2: ['12345678', [Validators.required, Validators.minLength(8)] ],
        terminos: [ false , [Validators.required, Validators.requiredTrue] ],
      }, {
        validators: this.clavesIguales('password', 'password2')
      });

    }

    /*Notas: 
    - En la consola del cliente o bien del navegador, salen los valores que se registran más no son enviados aún en la base de datos
    hasta que se cumplan todas las validaciones correspondientes.
   - los true o false que están por debajo de los datos indican si es true es porque acepta los términos y condiciones, caso contrario
    aparece un false.
    - Si se presenta algún inconveniente en el proceso del registro de manera interna, sale el mensaje "form incorrecto", caso contrario
    sale el mensaje "posteando form", de seguido a ello se genera el token jwt.
    - El token del usuario se renueva cada 100 horas, por lo que después, esa sesión se cerrará y toca volver a ingresar a la aplicación, este solo 
    es válido si el usuario ya está registrado.
*/
  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm.get('terminos').value);
  

    if ( this.registerForm.valid && (this.registerForm.get('password').value === this.registerForm.get('password2').value) && (this.registerForm.get('terminos').value === true) ) {

      ////////////////////////////////////
      /////////////////////////////////
     console.log('posteando form');
     
    //Posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
    .subscribe( (response) => {
        
           // Navegar al Dashboard
           this.router.navigateByUrl('/login');

        Swal.fire('Usuario Registrado Correctamente', '', 'success');
        
    }, 
    
    (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      
    });
    //////////////////////////////
    ///////////////////////////
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




  clavesNoValidas(){
    const clave1 = this.registerForm.get('password').value;
    const clave2 = this.registerForm.get('password2').value;

    if ( (clave1 !== clave2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  aceptarTerminos(){

    // envío de false si arriba en terminos es true
    // envío de true si arriba es false
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
  

  clavesIguales(clave1Name: string, clave2Name: string){

    return ( formGroup: FormGroup ) => {
        const clave1Control = formGroup.get(clave1Name);
        const clave2Control = formGroup.get(clave2Name);

        if ( (clave1Control.value === clave2Control.value) && this.formSubmitted ) {
          clave2Control.setErrors(null)
        } else {
          clave2Control.setErrors( { noEsIgual: true } )
        }
    }

  }

  
}

