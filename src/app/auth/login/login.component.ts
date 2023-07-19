import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
loginForm: FormGroup<any>
  email: string;
  remember: boolean = false;



  constructor(private usuarioService: UsuarioService, private router: Router, fb: FormBuilder, private ngZone: NgZone ){

      this.loginForm = fb.group({
    
        email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
        password: ['', Validators.required ],
        remember: [false]
      });

    }
  

ngOnInit(): void {


  this.email = localStorage.getItem('email') || '';
  if (this.email.length > 1){
    this.remember = true;
  }
}
 
  

  login(){
  this.usuarioService.login( this.loginForm.value )
  .subscribe( resp => {

    if ( this.loginForm.get('remember').value ){ 
      localStorage.setItem('email', this.loginForm.get('email').value );
    } else {
      localStorage.removeItem('email');
    }

    // Navegar al Dashboard
    this.router.navigateByUrl('/');

  }, (err) => {
    // Si sucede un error
    Swal.fire('Error', err.error.msg, 'error' );
  });
}

}