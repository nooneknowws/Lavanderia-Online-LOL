import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../shared/models/usuario/funcionario';
import { Voo } from '../../shared/models/voo/voo';
import { AuthService } from '../../shared/services/auth.service';
import { VooService } from '../../shared/services/voo.service';
import { OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-funcionario',
  templateUrl: './dashboard-funcionario.component.html',
  styleUrl: './dashboard-funcionario.component.css'
})
export class DashboardFuncionarioComponent implements OnInit, OnDestroy {
  user: Funcionario | null = null;
  voos: Voo[] = [];
  funcionario: Funcionario | void = {};

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private vooService: VooService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.user = this.authService.getUser();
      this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user as Funcionario;
        if(this.user) {
          this.getVoos();
        }
      });
    this.funcionario = this.getUser()
    console.log(this.user);
    console.log(this.funcionario);
  }

  getUser(): void {
    if(this.user) {
      this.authService.getFuncionario(this.user.id).subscribe(
        (funcionario: Funcionario) => {
          console.log("Funcionario Data: ", funcionario);
          this.funcionario = funcionario;
        },
        (error) => {
          console.error("Error fetching funcionario data: ", error);
        }
      );
    }
  }

  getVoos(): void {
    this.vooService.getVoosProximas48Horas().subscribe((voos: Voo[]) => {
      this.voos = voos;
      console.log(voos)
    });
  }

  confirmarEmbarque(voo: Voo): void {
    this.router.navigate(['/funcionario/confirmar-embarque', voo.id]);
  }

  cancelarVoo(voo: Voo): void {
    this.router.navigate(['/funcionario/cancelar-voo', voo.codigoVoo]);
  }

  realizarVoo(voo: Voo): void {
    this.router.navigate(['/funcionario/realizar-voo', voo.codigoVoo]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
