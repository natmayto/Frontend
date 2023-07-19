import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Articulo } from '../models/articulo';
import { CargarArticulo } from '../interfaces/cargar-articulos.interface';
import { registerArticulo } from '../interfaces/registerArticulo.interface';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class ArticulosService { 

 
    constructor( private http: HttpClient){}



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
  

    
  cargarArticulo() {

    const url = `${ base_url }/articulos`;
    return this.http.get( url, this.headers )
            .pipe(
                map( (resp: any ) => resp.articulos )
            );
  }
  
  crearArticulo(formData: registerArticulo) {

    const url = `${ base_url }/articulos`;
    return this.http.post<Articulo[]>( url, formData , this.headers )
                                                // .pipe(
                                                //   tap( (resp: any) => {
                                                //     this.guardarLocalStorage( resp.token, resp.menu );
                                                //   })
                                                // )
           
  }
  guardarLocalStorage(token: any, menu: any) {
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  actualizarArticulo( _id: string, producto: string, cantidad: number) {

    const url = `${ base_url }/articulos/${_id}`;
    return this.http.put<Articulo[]>( url, {producto,cantidad}, this.headers )
           
  }

  eliminarArticulo( _id: string ) {

    const url = `${ base_url }/articulos/${_id}`;
    return this.http.delete<Articulo[]>( url, this.headers )
           
  }

}

