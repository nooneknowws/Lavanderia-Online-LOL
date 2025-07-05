import { Usuario } from "../usuario/usuario";

export class Autenticacao {
    constructor(
        public token?: string,
        public user?: Usuario
    ) {}
}
