import { Reserva } from "../models/reserva";

export interface cargarReserva {
    total: number;
    reservas: Reserva[];
}