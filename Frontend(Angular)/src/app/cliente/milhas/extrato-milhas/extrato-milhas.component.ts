import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { Milhas } from '../../../shared/models/cliente/milhas';
import { Cliente } from '../../../shared/models/cliente/cliente';

@Component({
  selector: 'app-extrato-milhas',
  templateUrl: './extrato-milhas.component.html',
  styleUrl: './extrato-milhas.component.css'
})
export class ExtratoMilhasComponent implements OnInit {
  cliente: Cliente | null = null;
  milhas: Milhas[] = [];

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user?.id) {
      this.loadClienteData(user.id);
    }
  }

  private loadClienteData(clienteId: string): void {
    this.clienteService.getClienteById(clienteId).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.loadTransacoes(clienteId);
      },
      error: (error) => {
        console.error('Error loading client data:', error);
        alert('Erro ao carregar dados do cliente.');
      }
    });
  }

  private loadTransacoes(clienteId: string): void {
    this.clienteService.listarTransacoes(clienteId).subscribe({
      next: (transacoes) => {
        this.milhas = transacoes;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        alert('Erro ao carregar transações.');
      }
    });
  }
}