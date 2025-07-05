import { Usuario } from "./usuario";
export class Funcionario extends Usuario {
    constructor(
      public telefone?: string,
      public funcStatus?: string
    ) { super(); }
  }
  
