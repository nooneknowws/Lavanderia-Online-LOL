import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-cancelar-reserva',
  templateUrl: './cancelar-reserva.component.html',
  styleUrl: './cancelar-reserva.component.css'
})
export class CancelarReservaComponent {
  user: Cliente | null = null;
  reserva: ReservaDTO | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;
  e = StatusReservaEnum;

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getReserva(id);
    });
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

  cancelarReserva(reserva: ReservaDTO): void {
    if (reserva.id !== undefined && reserva.id !== null) {
      if (confirm('Deseja realmente cancelar essa reserva?')) {
        this.reservaService.cancelarReserva(reserva.id).subscribe(
          () => {
            const reservaAtualizada = Array.isArray(this.reserva) ? this.reserva.find(r => r.id === reserva.id) : null;
            if (reservaAtualizada) reservaAtualizada.status = this.e.CANCELADO;
            else console.error('Reserva não encontrada na lista.');
          },
          error => {
            console.error('Erro ao cancelar a reserva:', error);
          }
        );
      }
    } else console.error('ID da reserva inválido');
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/cliente']);
  }

}
