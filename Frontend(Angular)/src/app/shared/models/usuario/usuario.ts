import { Endereco } from "./endereco";

export class Usuario {
    constructor(
      public id?: string,
      public cpf?: string,
      public nome?: string,
      public email?: string,
      public senha?: string,
      public endereco?: Endereco,
      public perfil?: string
    ) {}
}
