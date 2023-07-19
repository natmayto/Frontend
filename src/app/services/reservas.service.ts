import { Injectable } from '@angular/core';
import { BuscarService } from './buscar.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Reserva } from '../models/reserva';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { registerReserva } from '../interfaces/registerReserva.interface';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})


export class ReservasService {

    constructor( private buscarService: BuscarService, private http: HttpClient, private router: Router){}

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
    
  
      
    cargarReserva() {
  
      const url = `${ base_url }/reservas`;
      return this.http.get<Reserva[]>( url, this.headers )
              .pipe(
                  map( (resp: any) => resp.reservas )
              );
    }

    guardarLocalStorage(token: any, menu: any) {
        localStorage.setItem('token', token );
        localStorage.setItem('menu', JSON.stringify(menu) );
      }

      crearReserva( formData: registerReserva ) {

        const url = `${ base_url }/reservas`;
        return this.http.post<Reserva[]>( url, formData , this.headers )
                                                    // .pipe(
                                                    //   tap( (resp: any) => {
                                                    //     this.guardarLocalStorage( resp.token, resp.menu );
                                                    //   })
                                                    // )
               
      }
    
    
      actualizarReserva(_id: string, nombre: string, fecha: Date , descripcion: string) {
    
        const url = `${ base_url }/reservas/${ _id }`;
        return this.http.put<Reserva[]>( url, {nombre, fecha, descripcion}, this.headers )
               
      }
    
      eliminarReserva( _id: string ) {
    
        const url = `${ base_url }/reservas/${ _id }`;
        return this.http.delete<Reserva[]>( url, this.headers )
               
      }
 }