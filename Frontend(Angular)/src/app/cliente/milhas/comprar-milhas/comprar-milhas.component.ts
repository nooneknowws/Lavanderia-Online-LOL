import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { ClienteService } from '../../../shared/services/cliente.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-comprar-milhas',
  templateUrl: './comprar-milhas.component.html',
  styleUrl: './comprar-milhas.component.css'
})
export class ComprarMilhasComponent implements OnInit {
  cliente: Cliente | null = null;
  valorEmReais: number = 0;
  milhasCompradas: number = 0;
  readonly DESCRICAO: string = "COMPRA DE MILHAS";

  constructor(
    private authService: AuthService, 
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user?.id) {
      this.clienteService.getClienteById(user.id).subscribe({
        next: (cliente) => {
          this.cliente = cliente;
        },
        error: (error) => {
          console.error('Error loading client data:', error);
          alert('Erro ao carregar dados do cliente.');
        }
      });
    }
  }

  calcularMilhas(): void {
    const valor = parseFloat(this.valorEmReais.toString()) || 0; 
    this.milhasCompradas = parseFloat((valor / 5).toFixed(2)); 
  }

  comprarMilhas(): void {
    const valor = parseFloat(this.valorEmReais.toString()) || 0;
    if (valor <= 0) {
      alert('Por favor, insira um valor válido para a compra.');
      return;
    }
  
    this.valorEmReais = valor; 
    this.calcularMilhas();
  
    if (!this.cliente?.id) {
      alert('Erro: Cliente não identificado.');
      return;
    }
  
    this.clienteService.processarTransacaoMilhas(
      this.valorEmReais,
      this.milhasCompradas,
      'ENTRADA',
      this.cliente.id,
      this.DESCRICAO
    ).subscribe({
      next: (transacao) => {
        alert(`Milhas compradas com sucesso! Quantidade de milhas: ${this.milhasCompradas}`);
        this.limparFormulario();
        if (this.cliente?.id) {
          this.clienteService.getClienteById(this.cliente.id).subscribe(
            clienteAtualizado => this.cliente = clienteAtualizado
          );
        }
      },
      error: (error) => {
        console.error('Error buying miles:', error);
        alert('Erro ao comprar milhas. Por favor, tente novamente.');
      }
    });
  }

  limparFormulario(): void {
    this.valorEmReais = 0.0;
    this.milhasCompradas = 0.0;
  }
  
}