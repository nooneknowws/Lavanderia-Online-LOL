import { Usuario } from "../usuario/usuario";
import { Milhas } from "./milhas";

export class Cliente extends Usuario {
    constructor(
      public telefone?: string,
      public saldoMilhas?: number,
      public milhas?: Milhas[],
    ) { super(); }
  }
  