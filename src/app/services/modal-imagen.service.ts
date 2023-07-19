// import { Injectable, EventEmitter } from '@angular/core';
// import { environment } from '../../environments/environment';

// const base_url = environment.base_url;

// @Injectable({
//   providedIn: 'root'
// })
// export class ModalImagenService {

//   private _ocultarModal: boolean = true;
//   public tipo: 'usuarios'|'articulos'|'inventarios' | 'reservas' | 'eventos';
//   public id: string;
//   public img: string;

//   public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

//   get ocultarModal() {
//     return this._ocultarModal;
//   }

//   abrirModal( 
//       tipo:  'usuarios'|'articulos'|'inventarios' | 'reservas' | 'eventos',
//       id: string,
//       img: string = 'sin-imagen'
//     ) {
//     this._ocultarModal = false;
//     this.tipo = tipo;
//     this.id = id;
//     // localhost:3000/api/archivos/tipo/no-img
//       if ( img.includes('https') ) {
//         this.img = img;
//       } else {
//         this.img = `${ base_url }/archivos/${ tipo }/${ img }`;
//       }
//   }

//   cerrarModal() {
//     this._ocultarModal = true;
//   }

//   constructor() { }
// }