import { Articulo } from "../models/articulo";

export interface CargarArticulo {
    total: number;
    articulos: Articulo[];
}