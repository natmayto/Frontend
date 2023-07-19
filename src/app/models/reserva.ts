
//cambiar



interface _reservaUser {
    _id: string;
    nombre: string;
    img: string;
}



export class Reserva {

    constructor(
        public nombre: string,
        public fecha: Date,
        public descripcion?: string,
        public _id?: string,
        public usuario?: _reservaUser,
    ){}
}
//nombre fecha descripción
//usuario