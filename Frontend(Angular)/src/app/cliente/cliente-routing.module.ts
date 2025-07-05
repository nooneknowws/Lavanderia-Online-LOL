import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheReservaComponent } from './reserva/detalhe-reserva/detalhe-reserva.component';
import { CancelarReservaComponent } from './reserva/cancelar-reserva/cancelar-reserva.component';
import { ComprarMilhasComponent } from './milhas/comprar-milhas/comprar-milhas.component';
import { ExtratoMilhasComponent } from './milhas/extrato-milhas/extrato-milhas.component';
import { ConsultarReservaComponent } from './reserva/consultar-reserva/consultar-reserva.component';
import { FazerCheckinComponent } from './fazer-checkin/fazer-checkin.component';
import { AuthGuard } from '../shared/auth.guard';
import { EfetuarReservaComponent } from './reserva/efetuar-reserva/efetuar-reserva.component';
import { InicioComponent } from '../autenticacao/inicio/inicio.component';
import { ClienteLayoutComponent } from './cliente-layout/cliente-layout.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';

const routes: Routes = [
  {
    path: 'cliente',
    component: ClienteLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'cliente' },
    children: [
      { path: '', component: DashboardClienteComponent },
      { path: 'detalhe-reserva/:id', component: DetalheReservaComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
      { path: 'cancelar-reserva/:id', component: CancelarReservaComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
      { path: 'comprar-milhas', component: ComprarMilhasComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
      { path: 'extrato-milhas', component: ExtratoMilhasComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
      { path: 'efetuar-reserva', component: EfetuarReservaComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
      { path: 'consultar-reserva', component: ConsultarReservaComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
      { path: 'fazer-checkin', component: FazerCheckinComponent, canActivate: [AuthGuard], data: { role: 'cliente' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
