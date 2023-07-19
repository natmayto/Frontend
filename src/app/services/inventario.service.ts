import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventario } from '../models/inventario';
import { Router } from '@angular/router';
import { registerInventario } from '../interfaces/registerInventario.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

//aquí se conecta el frontend con el backend mediante la url del backend en el servicio Formulario.service.ts

export class InventarioService {
  //   })
  // )
   //     this.guardarLocalStorage( resp.token, resp.menu );


  constructor( private http: HttpClient, private router: Router ) { }

  

  private _ocultarModal: boolean = true;


  get ocultarModal(){
      return this._ocultarModal;
  }

  abrirModal(){
      this._ocultarModal = false;
  }

  cerrarModal(){
      this._ocultarModal = true;
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'xtoken': this.token
      }
    }
  }

  cargarInventario() {

    const url = `${ base_url }/inventarios`;
    return this.http.get<Inventario[]>( url, this.headers )
            .pipe(
                map( (resp: any) => resp.inventario )
            );
  }

  crearInventario( formData: registerInventario ) {

    const url = `${ base_url }/inventarios`;
    return this.http.post<Inventario[]>( url, formData, this.headers )
                                      //   .pipe(
                                      //   tap( (resp: any) => {
                                      //     this.guardarLocalStorage( resp.token, resp.menu );
                                      //   })
                                      // )
           
  }

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }


  actualizarInventario( _id: string, nombre: string, cantidad: Number , descripcion: string ) {

    const url = `${ base_url }/inventarios/${_id}`;
    return this.http.put<Inventario[]>( url, {nombre, cantidad, descripcion}, this.headers )
           
  }

  eliminarInventario( _id: string) {

    const url = `${ base_url }/inventarios/${_id}`;
    return this.http.delete<Inventario[]>( url, this.headers )
           
  }
  
}
