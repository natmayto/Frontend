
//nombre cantidad descripción

interface _inventarioUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Inventario {

    constructor(
        
        public _id: string, 
        public nombre: string,
        public cantidad: Number,
        public descripcion?: string,
        public img?: string,
        public usuario?: _inventarioUser,
        
    ){}
}

