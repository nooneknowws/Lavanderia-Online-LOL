import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ReservaDTO } from '../../shared/models/reserva/reservaDTO';
import { Reserva } from '../../shared/models/reserva/reserva';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';
import { Usuario } from '../../shared/models/usuario/usuario';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css']
})
export class DashboardClienteComponent implements OnInit, OnDestroy {
  reservas: ReservaDTO[] = [];
  e = StatusReservaEnum;
  user: Cliente | null = null;
  cliente: Cliente = {};
  isLoading = false;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();
  private loadingStates = {
    clientData: false,
    reservas: false
  };

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUserData();
    this.subscribeToUserChanges();
  }

  private initializeUserData(): void {
    this.setLoading(true);
    this.user = this.authService.getUser();
    
    if (this.user?.id) {
      this.loadClientData(this.user.id);
    } else {
      this.setLoading(false);
    }
  }

  private subscribeToUserChanges(): void {
    this.authService.currentUser
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (user) => {
          this.user = user as Cliente;
          if (this.user?.id) {
            this.loadClientData(this.user.id);
          }
        },
        error: (error) => {
          console.error('Error in user subscription:', error);
          this.handleError('Erro ao carregar dados do usuário');
        }
      });
  }

  private loadClientData(userId: string): void {
    this.loadingStates.clientData = true;
    
    this.authService.getCliente(userId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingStates.clientData = false;
          this.updateLoadingState();
        })
      )
      .subscribe({
        next: (cliente: Cliente) => {
          this.cliente = cliente;
          if (cliente.id) {
            this.loadReservas(cliente.id);
          }
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
          this.handleError('Erro ao carregar dados do cliente');
        }
      });
  }

  private loadReservas(clienteId: string): void {
    this.loadingStates.reservas = true;
    
    this.reservaService.getReservasByClienteId(clienteId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingStates.reservas = false;
          this.updateLoadingState();
        })
      )
      .subscribe({
        next: (reservas: ReservaDTO[]) => {
          this.reservas = this.sortReservas(reservas);
        },
        error: (error) => {
          console.error('Error fetching reservas:', error);
          this.handleError('Erro ao carregar reservas');
        }
      });
  }
  private sortReservas(reservas: ReservaDTO[]): ReservaDTO[] {
    return reservas.sort((a, b) => {
      if (a.status === StatusReservaEnum.PENDENTE && b.status !== StatusReservaEnum.PENDENTE) {
        return -1;
      }
      if (b.status === StatusReservaEnum.PENDENTE && a.status !== StatusReservaEnum.PENDENTE) {
        return 1;
      }
      return new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime();
    });
  }

  cancelarReserva(reserva: ReservaDTO): void {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      this.router.navigate(['/cliente/cancelar-reserva/', reserva.id]);
    }
  }

  logout(): void {
    this.setLoading(true);
    
    this.authService.logout()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout error:', error);
          this.router.navigate(['/login']);
        }
      });
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  private updateLoadingState(): void {
    this.isLoading = Object.values(this.loadingStates).some(state => state);
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}