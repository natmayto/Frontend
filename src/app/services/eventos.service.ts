import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento';
import { map } from 'rxjs/operators';
import { BuscarService } from './buscar.service';
import { ArticulosService } from './articulos.service';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class EventosService {

    constructor(private buscarService: BuscarService, private http: HttpClient, private router: Router, articuloService: ArticulosService){}



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
  

    
  cargarEvento() {

    const url = `${ base_url }/eventos`;
    return this.http.get<Evento[]>( url, this.headers )
            .pipe(
                map( (resp: any) => resp.eventos )
            );
  }
  
  crearEvento(evento: { nombre: string, articulo: string }) {

    const url = `${ base_url }/eventos`;
    return this.http.post<Evento[]>( url, evento , this.headers )
                                                // .pipe(
                                                //   tap( (resp: any) => {
                                                //     this.guardarLocalStorage( resp.token, resp.menu );
                                                //   })
                                                // )
           
  }

  obtenerEventoPorId( id: string ) {

    const url = `${ base_url }/eventos/${ id }`;
    return this.http.get( url, this.headers )
    .pipe(
      map( (resp: any) => resp.evento )
  );
             
  }

  guardarLocalStorage(token: any, menu: any) {
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  actualizarEvento( evento: Evento) {

    const url = `${ base_url }/eventos/${ evento._id }`;
    return this.http.put<Evento[]>( url, evento, this.headers )
           
  }

  eliminarEvento( _id: string ) {

    const url = `${ base_url }/eventos/${ _id }`;
    return this.http.delete<Evento[]>( url, this.headers )
           
  }
}