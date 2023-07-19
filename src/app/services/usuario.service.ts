import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { registerForm  } from '../interfaces/register.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { LoginForm } from '../interfaces/login.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CargarUsuario } from '../interfaces/usuariosManage.interface';




const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) { }

  logout(){
    localStorage.removeItem('token');

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })
    
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'xtoken': this.token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }

  crearUsuario( formData: registerForm ){
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  this.guardarLocalStorage( resp.token, resp.menu );
                })
              )
 
  }


  actualizacionPerfil( data: { email: string, nombre: string } ) {

    data = {
      ...data,
      
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers );

  }

  login( formData: LoginForm ){
    
    return this.http.post(`${ base_url }/login`, formData )
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage( resp.token, resp.menu );
      })
    );
  
   }

   validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renovar`, {
      headers: {
        'xtoken': this.token
      }
    }).pipe(
      map( (resp: any) => {
        
        const { nombre, email, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false) )
    );
  }


  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get< CargarUsuario>( url, this.headers )
            .pipe(
              delay(500),
              map( resp => {
                const usuarios = resp.usuarios.map( 
                  user => new Usuario(user.nombre, user.email, '', user.img, user.uid )  
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            )
  }


  eliminacionUsuario( usuario: Usuario ) {
    
      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/usuarios/${ usuario.uid }`;
      return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

  }
  

}