//es una interfaz del usuario a asignar con artículo

import { Usuario } from "./usuario";

//           "producto": "empanada",
//         "cantidad": 2,
//         "usuario": "64b40e20b9ff47cb297872b7",
//         "_id": "64b62d741374cd833ca61f6e"
// producto cantidad img

interface _articuloUser {
    _id: string;
    nombre: string;
    img: string;
}



//clase artículo
export class Articulo {
    uid: string;
   
   

    constructor(
        public producto: string,
        public cantidad: number,
        public _id?: string,
        public img?: string,
        public usuario?: _articuloUser,
        
    ){}
}
