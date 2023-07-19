//cambiar
//es una interfaz del usuario a asignar con evento

import { Articulo } from "./articulo";
import { Usuario } from "./usuario";

// "ok": true,
// "evento": {
//     "nombre": "bazar",
//     "descripcion": "22",
//     "usuario": "64b40e20b9ff47cb297872b7",
//     "articulo": "64b62d741374cd833ca61f6e",
//     "_id": "64b62e1d1374cd833ca61f70"
// }

// nombre descripción img
// usuario articulo

interface _eventoUser {
    _id: string;
    nombre: string;
    img: string;
}

interface _articulo {
    _id: string;
    producto: string;
    cantidad: number;
}

export interface registerEvento {
    nombre: string,
    _id?: string,
    img?: string,
    articulo?: Articulo[],
    usuario?: Usuario[]
    

}

export class Evento {
   
   

    constructor(
        public nombre: string,
        public _id?: string,
        public descripcion?: string,
        public img?: string,
        public usuario?: _eventoUser,
        public articulo?: _articulo
        
    ){}
}
