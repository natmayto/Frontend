import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Articulo } from '../models/articulo';
import { Inventario } from '../models/inventario';
import { Evento } from '../models/evento';
import { Reserva } from '../models/reserva';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class BuscarService { 

    constructor ( private http: HttpClient){
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
// 'usuario' | 'inventario' | 'evento' | 'articulo'

private generarUsuario(resultados: any[]): Usuario[] {

return resultados.map(
    user => new Usuario(user.nombre, user.email, '', user.img, user.uid )  
);
}

private generarArticulo(resultados: any[]): Articulo[] {

  return resultados.map(
  art => new Articulo(art.producto , art.cantidad, art.img, art.uid )  
  );
  }

  private generarInventario(resultados: any[]): Inventario[] {

    return resultados.map(
      inv => new Inventario(inv.nombre , inv.cantidad, inv.img, inv.uid )  
      );
    }

    private generarEvento(resultados: any[]): Evento[] {

      return resultados.map(
        eve => new Evento(eve.nombre , eve.descripcion, eve.img, eve.uid )  
        );
      }

      private generarReserva(resultados: any[]): Reserva[] {

        return resultados.map(
          res => new Reserva(res.nombre ,res.fecha, res.descripcion)  
          );
      }

      buscar(
        tipo: 'usuarios' | 'inventarios' | 'eventos' | 'articulos' | 'reservas',
         termino: string )
         {
           const url = `${ base_url }/busquedas/coleccion/${ tipo }/${ termino }`;
           return this.http.get<any[]>( url, this.headers )
                   .pipe(
                       map( (resp: any ) =>{
   
                           switch (tipo) {
                               case 'usuarios':
                                   return this.generarUsuario(resp.resultados)

                               default:
                                   return[];
                           }
                       })
                   );
   
         }


    buscarArticulo(
      tipo: 'articulos',
       termino: string )
       {
         const url = `${ base_url }/busquedas/coleccion/${ tipo }/${ termino }`;
         return this.http.get<any[]>( url, this.headers )
                 .pipe(
                     map( (resp: any ) =>{
 
                         switch (tipo) {
                             case 'articulos':
                                 return this.generarArticulo(resp.resultados)
    
                             default:
                                 return[];
                         }
                     })
                 );
 
       }

       buscarInventario(
        tipo: 'inventarios',
         termino: string )
         {
           const url = `${ base_url }/busquedas/coleccion/${ tipo }/${ termino }`;
           return this.http.get<any[]>( url, this.headers )
                   .pipe(
                       map( (resp: any ) =>{
   
                           switch (tipo) {
                               case 'inventarios':
                                   return this.generarInventario(resp.resultados)
      
                               default:
                                   return[];
                           }
                       })
                   );
   
         }

         buscarEvento(
          tipo: 'eventos',
           termino: string )
           {
             const url = `${ base_url }/busquedas/coleccion/${ tipo }/${ termino }`;
             return this.http.get<any[]>( url, this.headers )
                     .pipe(
                         map( (resp: any ) =>{
     
                             switch (tipo) {
                                 case 'eventos':
                                     return this.generarEvento(resp.resultados)
        
                                 default:
                                     return[];
                             }
                         })
                     );
     
           }

           buscarReserva(
            tipo: 'reservas',
             termino: string )
             {
               const url = `${ base_url }/busquedas/coleccion/${ tipo }/${ termino }`;
               return this.http.get<any[]>( url, this.headers )
                       .pipe(
                           map( (resp: any ) =>{
       
                               switch (tipo) {
                                   case 'reservas':
                                       return this.generarReserva(resp.resultados)
          
                                   default:
                                       return[];
                               }
                           })
                       );
       
             }

}