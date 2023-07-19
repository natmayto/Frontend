import { Usuario } from "../models/usuario";



export interface registerReserva {
   
     nombre: string,
     fecha: Date,
     descripcion?: string,

     usuario?: Usuario[],

}