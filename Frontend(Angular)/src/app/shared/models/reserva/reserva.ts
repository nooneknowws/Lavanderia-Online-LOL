import { Aeroporto } from "../voo/aeroporto";
import { Voo } from "../voo/voo";
import { StatusReservaEnum } from "./status-reserva.enum";

export class Reserva {
    constructor(
        public id?: string,
        public codigoReserva?: string,
        public dataHora?: string,
        public origem?: Aeroporto,
        public destino?: Aeroporto,
        public valor?: number,
        public milhas?: number,
        public status?: StatusReservaEnum,
        public quantidade?: number,
        public voo?: Voo
    ){}
}