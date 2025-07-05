export class HistoricoAlteracaoEstadoDTO {
  id: number;
  dataHoraAlteracao: Date;
  estadoOrigem: string;
  estadoDestino: string;

  constructor(id: number, dataHoraAlteracao: Date, estadoOrigem: string, estadoDestino: string) {
      this.id = id;
      this.dataHoraAlteracao = dataHoraAlteracao;
      this.estadoOrigem = estadoOrigem;
      this.estadoDestino = estadoDestino;
  }
}