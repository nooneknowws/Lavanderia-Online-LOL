export interface MilhasDTO {
    clienteId: string;
    quantidade: number;
    entradaSaida: 'ENTRADA' | 'SAIDA';
    valorEmReais: number,
    descricao: string;
    reservaId?: string;
  }