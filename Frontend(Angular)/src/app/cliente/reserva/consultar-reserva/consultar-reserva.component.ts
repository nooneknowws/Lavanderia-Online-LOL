import { Component } from '@angular/core';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Router } from '@angular/router';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';
import { AuthService } from '../../../shared/services/auth.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { Usuario } from '../../../shared/models/usuario/usuario';
@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent {
  reserva: ReservaDTO | null = null;
  codigoReservaInput: string = "";
  e = StatusReservaEnum;
  loading: boolean = true;
  errorMessage: string | null = null;
  private loggedInUser: Usuario | null = null;

  public constructor(
    private reservaService: ReservaService,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.loggedInUser = this.authService.getUser();
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  getReserva(id: string): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.reservaService.getReservaByCod(id).subscribe({
      next: (reserva) => {
        const reservaClienteId = String(reserva?.clienteId);
        const loggedInId = String(this.loggedInUser?.id);
        
        if (reserva && reservaClienteId === loggedInId) {
          this.reserva = reserva;
        } else {
          this.reserva = null;
          this.errorMessage = 'Reserva não encontrada';
          console.log('Unauthorized access attempt: Reservation does not belong to logged-in user');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching reserva:', error);
        this.errorMessage = 'Reserva não encontrada';
        this.reserva = null;
        this.loading = false;
      }
    });
  }


  fazerCheckin() {
    this.router.navigate(['/cliente/fazer-checkin'])
  }

  cancelarReserva(reserva: ReservaDTO) {
    this.router.navigate(['cliente/cancelar-reserva/', reserva.id])
  }
}
