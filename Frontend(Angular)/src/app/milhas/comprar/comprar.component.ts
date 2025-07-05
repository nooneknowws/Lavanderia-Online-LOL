import { Component } from '@angular/core';
import { Cliente } from '../../shared/models/cliente/cliente';
import { Milhas } from '../../shared/models/cliente/milhas.model';
import { AuthService } from '../../shared/services/auth.service';
import { ClienteService } from '../../shared/services/cliente.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent {
  cliente: Cliente;
  valorEmReais: number = 0;
  milhasCompradas: number = 0;
  descricao: string = "COMPRA DE MILHAS";

  constructor(private authService: AuthService, private clienteService: ClienteService) {
    this.cliente = this.authService.getUser() as Cliente;
  }

  calcularMilhas(): void {
    this.milhasCompradas = this.valorEmReais / 5;
  }

  comprarMilhas(): void {
    if (this.valorEmReais > 0) {
      this.calcularMilhas();
      this.clienteService.registrarTransacao(this.cliente.id!, this.valorEmReais, 'entrada').subscribe(
        clienteAtualizado => {
          this.cliente = clienteAtualizado;
          alert(`Milhas compradas com sucesso! Quantidade de milhas: ${this.milhasCompradas}`);
          this.limparFormulario();
        },
        error => {
          alert('Erro ao comprar milhas. Por favor, tente novamente.');
          console.error(error);
        }
      );
    } else {
      alert('Por favor, insira um valor válido para a compra.');
    }
  }

  limparFormulario(): void {
    this.valorEmReais = 0;
    this.milhasCompradas = 0;
  }
}