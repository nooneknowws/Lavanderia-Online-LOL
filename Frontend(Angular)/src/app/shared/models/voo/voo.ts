import { Aeroporto } from "./aeroporto";

export class Voo {
    constructor(
        public id?: string,
        public codigoVoo?: string,
        public dataHoraPartida?: Date,
        public origem?: Aeroporto,
        public destino?: Aeroporto,
        public valorPassagem?: number,
        public quantidadeAssentos?: number,
        public quantidadePassageiros?: number,
        public status?: string
    ) { }
}
