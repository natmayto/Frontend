import { Usuario } from "../models/usuario";
import { Articulo } from "../models/articulo";

export interface registerEvento {
    nombre: string,
    descripcion?: string,
    img?: string,
    articulo: Articulo[],
    usuario?: Usuario[]
    

}