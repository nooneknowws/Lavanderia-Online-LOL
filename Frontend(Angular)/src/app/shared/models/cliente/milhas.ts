import { Cliente } from "./cliente";

export class Milhas {
    constructor(
      public cliente?: Cliente,
      public dataHoraTransacao?: string,
      public valorEmReais?: number,
      public quantidade?: number,
      public entradaSaida?: string,
      public descricao?: string,
    ) { }
  }
  
