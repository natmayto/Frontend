import { Usuario } from "../models/usuario";



export interface registerArticulo {
    producto: string,
    cantidad: number,
    img?: string,
    usuario?: Usuario[],
    

}