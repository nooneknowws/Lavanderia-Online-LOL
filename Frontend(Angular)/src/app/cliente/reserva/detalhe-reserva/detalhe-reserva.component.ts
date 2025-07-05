
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-detalhe-reserva',
  templateUrl: './detalhe-reserva.component.html',
  styleUrl: './detalhe-reserva.component.css'
})
export class DetalheReservaComponent {
  user: Cliente | null = null;
  reserva: ReservaDTO | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;
  e = StatusReservaEnum;

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getReserva(id);
      } else {
        this.errorMessage = 'ID da reserva não fornecido';
        this.loading = false;
      }
    });
    console.log('Status:', this.reserva?.status);
    console.log('Enum:', this.e.CANCELADO);
  }

  getReserva(id: string): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.reservaService.getReservaById(id).subscribe({
      next: (reserva) => {
        this.reserva = reserva;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching reserva:', error);
        this.errorMessage = 'Erro ao carregar detalhes da reserva';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string | null): string {
    if (!status) return 'text-bg-light';
    
    switch (status) {
      case this.e.PENDENTE: return 'text-bg-secondary';
      case this.e.CONFIRMADO: return 'text-bg-success';
      case this.e.CANCELADO: return 'text-bg-danger';
      case this.e.EMBARCADO: return 'text-bg-info';
      default: return 'text-bg-secondary';
    }
  }
}