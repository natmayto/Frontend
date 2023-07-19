import { Usuario } from "../models/usuario";



export interface registerInventario {
    nombre: string,
    cantidad: number,
    descripcion?: string,
    img?: string,
    usuario?: Usuario[],
    

}