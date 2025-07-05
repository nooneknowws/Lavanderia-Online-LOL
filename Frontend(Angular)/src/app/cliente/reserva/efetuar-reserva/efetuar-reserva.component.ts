import { Component, OnInit } from '@angular/core';
import { ReservaService } from './../../../shared/services/reserva.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { Aeroporto } from '../../../shared/models/voo/aeroporto';
import { Voo } from '../../../shared/models/voo/voo';
import { AuthService } from '../../../shared/services/auth.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { Router } from '@angular/router';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-efetuar-reserva',
  templateUrl: './efetuar-reserva.component.html',
  styleUrls: ['./efetuar-reserva.component.css']
})
export class EfetuarReservaComponent implements OnInit {
  cliente: Cliente | null = null;
  aeroportoOrigem?: Aeroporto = undefined;
  aeroportoDestino?: Aeroporto = undefined;
  voosFiltrados: Voo[] = [];
  vooSelecionado?: Voo = undefined;
  saldoMilhas: number = 0;
  quantidadePassagens: number = 0;
  milhasUsadas: number = 0;
  reserva: Reserva | ReservaDTO | undefined;
  aeroportos: Aeroporto[] = [];
  tabelaVisivel: boolean = false;
  valorTotal: number = 0;
  valorAPagar: number = 0;
  milhasNecessarias: number = 0;
  isLoading: boolean = false;

  constructor(private reservaService: ReservaService,
              private authService: AuthService,
              private clienteService: ClienteService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.reservaService.getAeroportos().subscribe(aeroportos => {
      this.aeroportos = aeroportos;
    });
    this.carregarDadosCliente();
  }
  private carregarDadosCliente(): void {
    const userId = this.authService.getUser()?.id;
    
    if (!userId) {
      console.error('Usuário não identificado');
      return;
    }
  
    this.authService.getCliente(userId).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.saldoMilhas = cliente?.saldoMilhas || 0;
        console.log('Dados do cliente carregados:', this.cliente);
        console.log('Saldo de milhas:', this.saldoMilhas);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados do cliente:', erro);
        alert('Não foi possível carregar os dados do cliente. Por favor, tente novamente.');
      }
    });
  }

  setAeroportos(aeroportoOrigem: Aeroporto | undefined, aeroportoDestino: Aeroporto | undefined) {
    this.aeroportoOrigem = aeroportoOrigem;
    this.aeroportoDestino = aeroportoDestino;
  
    if (this.aeroportoOrigem && this.aeroportoDestino) {
      if (this.aeroportoOrigem.codigo === this.aeroportoDestino.codigo) {
        alert("Não é possível buscar voos entre o mesmo aeroporto.");
        return;
      }
  
      this.reservaService.getVoosFiltrados(aeroportoOrigem!, aeroportoDestino!).subscribe(voosFiltrados => {
        this.voosFiltrados = voosFiltrados;
        this.tabelaVisivel = true;
      });
    }
  } 

  selecionarVoo(voo: Voo) {
    this.vooSelecionado = voo;
    this.tabelaVisivel = !this.tabelaVisivel;
    const userId = this.authService.getUser()?.id;
    if (userId) {
      this.authService.getCliente(userId).subscribe({
        next: (cliente) => {
          this.saldoMilhas = cliente?.saldoMilhas || 0;
          console.log('Saldo de milhas atualizado:', this.saldoMilhas);
        },
        error: (erro) => {
          console.error('Erro ao atualizar saldo de milhas:', erro);
        }
      });
    }
  }

  calcularValorTotal(): void {
    if (!this.vooSelecionado?.valorPassagem || !this.quantidadePassagens) {
      this.valorTotal = 0;
      this.valorAPagar = 0;
      this.milhasNecessarias = 0;
      return;
    }
    this.valorTotal = this.vooSelecionado.valorPassagem * this.quantidadePassagens;
    
    this.milhasNecessarias = this.valorTotal / 5;
  
    if (this.milhasUsadas > this.saldoMilhas) {
      alert('Saldo de milhas insuficiente! Você possui ' + this.saldoMilhas + ' milhas.');
      this.milhasUsadas = 0;
      this.valorAPagar = this.valorTotal;
      return;
    }
  
    this.valorAPagar = this.valorTotal - this.milhasUsadas;
  }
  
  confirmarReserva() {
    this.isLoading = true; 
    const user = this.authService.getUser();
    if (!user?.id || !this.cliente) {
        alert("Usuário não identificado ou dados do cliente não carregados");
        return;
    }

    if (!this.vooSelecionado || !this.cliente.id || !this.cliente.nome || !this.vooSelecionado.id || !this.vooSelecionado.codigoVoo ||
        !this.vooSelecionado.origem?.codigo || !this.vooSelecionado.destino?.codigo || 
        !this.vooSelecionado.dataHoraPartida) {
        alert("Dados incompletos para efetuar a reserva");
        return;
    }

    const codigoReserva = this.gerarCodigoReserva();
    const clienteId = parseInt(this.cliente.id.toString());
    const reservaDTO = new ReservaDTO(
        0,
        this.cliente.nome,
        new Date(),                               
        this.vooSelecionado.dataHoraPartida,     
        this.vooSelecionado.origem,  
        this.vooSelecionado.destino, 
        this.valorTotal,
        this.milhasUsadas,
        StatusReservaEnum.PENDENTE,
        this.vooSelecionado.codigoVoo,
        codigoReserva,
        parseInt(this.vooSelecionado.id),
        clienteId,
        this.quantidadePassagens,              
        []
    );
    console.log(reservaDTO);
  
    if (this.milhasUsadas > 0) {
        if (this.milhasUsadas > this.saldoMilhas) {
            alert("Saldo de milhas insuficiente para realizar esta reserva.");
            return;
        }

        const descricaoTransacao = `${this.vooSelecionado.origem.codigo}->${this.vooSelecionado.destino.codigo}`;
        
        this.clienteService.processarTransacaoMilhas(
            this.milhasUsadas * 5,
            this.milhasUsadas,
            'SAIDA',
            user.id,
            descricaoTransacao
        ).subscribe({
            next: () => {
                console.log("Milhas registradas no extrato.");
                this.efetuarReserva(reservaDTO, codigoReserva);
            },
            error: (erro) => {
                console.error("Erro ao registrar milhas no extrato:", erro);
                if (erro.error === "Saldo insuficiente") {
                    alert("Saldo de milhas insuficiente para realizar esta reserva.");
                } else {
                    alert("Ocorreu um erro ao processar as milhas para a reserva.");
                }
            }
        });
    } else {
        this.efetuarReserva(reservaDTO, codigoReserva);
    }
}
private efetuarReserva(reservaDTO: ReservaDTO, codigoReserva: string): void {
  this.reservaService.efetuar(reservaDTO).subscribe({
    next: (reservaCriada) => {
      this.reserva = reservaCriada;
      if (this.milhasUsadas > 0) {
        this.saldoMilhas -= this.milhasUsadas;
      }
      this.isLoading = false;  // Set loading to false on success
      alert(`Reserva confirmada!`);
      this.router.navigate(['/cliente']);
    },
    error: (erro) => {
      this.isLoading = false;  // Set loading to false on error
      console.error("Erro ao efetuar a reserva: ", erro);
      if (erro.status === 404) {
        alert("Serviço de reservas não encontrado. Por favor, tente novamente mais tarde.");
      } else {
        alert("Ocorreu um erro ao tentar efetuar a reserva. Por favor, tente novamente.");
      }
    }
  });
}

gerarCodigoReserva(): string {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  let codigo = '';

  for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  for (let i = 0; i < 3; i++) {
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }

  return codigo.toUpperCase();
}

}