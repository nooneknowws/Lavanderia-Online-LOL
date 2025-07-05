import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';
import { ReservaDTO } from '../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-fazer-checkin',
  templateUrl: './fazer-checkin.component.html',
  styleUrl: './fazer-checkin.component.css'
})
export class FazerCheckinComponent implements OnInit {
  user: Cliente | null = null;
  reservas: ReservaDTO[] = [];
  proximasReservas: ReservaDTO[] = []; 
  e = StatusReservaEnum;
  cliente: Cliente = {};
  isLoading = false;

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.authService.getUser();
    
    if (this.user?.id) {
      this.loadClientData(this.user.id);
    }

    this.authService.currentUser
      .subscribe(user => {
        this.user = user as Cliente;
        if (this.user?.id) {
          this.loadClientData(this.user.id);
        }
        this.isLoading = false;
      });
  }

  private loadClientData(userId: string): void {
    this.authService.getCliente(userId).subscribe({
      next: (cliente: Cliente) => {
        console.log("Client data:", cliente);
        this.cliente = cliente;
        if (cliente.id) {
          this.getReservas(cliente.id);
        }
      },
      error: (error) => {
        console.error("Error fetching client data:", error);
        this.isLoading = false;
      }
    });
  }

  getReservas(clienteId: string): void {
   
    this.reservaService.getReservasByClienteId(clienteId)
      .subscribe({
        next: (reservas: ReservaDTO[]) => {
          this.reservas = reservas || [];
          console.log('All reservas:', this.reservas);
        },
        error: (error) => {
          console.error('Error fetching reservas:', error);
          this.reservas = []; 
        }
      });

    this.reservaService.getProximasReservas(clienteId)
      .subscribe({
        next: (reservas: ReservaDTO[]) => {
          this.proximasReservas = reservas || []; 
          console.log('Próximas reservas:', this.proximasReservas);
        },
        error: (error) => {
          console.error('Error fetching próximas reservas:', error);
          this.proximasReservas = []; 
        }
      });
  }

  realizarCheckin(reserva: ReservaDTO): void {
    if (!reserva || !reserva.id) return; 

    this.reservaService.confirmarReserva(reserva.id)
      .subscribe({
        next: (response) => {
          console.log('Check-in successful:', response);
          if (this.cliente.id) {
            this.getReservas(this.cliente.id);
            alert('Check-in realizado com sucesso!');
          }
        },
        error: (error) => {
          console.error('Error during check-in:', error);
        }
      });
  }
  private isReservaPendente(reserva: ReservaDTO): boolean {
    return reserva.status === 'Pendente';
  }

  private isProximasHoras(dataHora: Date | string): boolean {
    const dataVoo = typeof dataHora === 'string' ? new Date(dataHora) : dataHora;
    const agora = new Date();
    const diferencaHoras = (dataVoo.getTime() - agora.getTime()) / (1000 * 60 * 60);
    return diferencaHoras >= 0 && diferencaHoras <= 48;
  }

  get reservasFiltradas(): ReservaDTO[] {
    return this.reservas
      .filter(reserva => this.isReservaPendente(reserva))
      .sort((a, b) => {
        const dataA = new Date(a.dataHoraPartida).getTime();
        const dataB = new Date(b.dataHoraPartida).getTime();
        return dataA - dataB;
      });
  }

  get podeRealizarCheckin(): (reserva: ReservaDTO) => boolean {
    return (reserva: ReservaDTO) => {
        const dataHoraPartida = new Date(reserva.dataHoraPartida);
        return this.isProximasHoras(dataHoraPartida);
    };
  }
}