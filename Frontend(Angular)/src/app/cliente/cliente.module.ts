import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { ComprarMilhasComponent } from './milhas/comprar-milhas/comprar-milhas.component';
import { ExtratoMilhasComponent } from './milhas/extrato-milhas/extrato-milhas.component';
import { DetalheReservaComponent } from './reserva/detalhe-reserva/detalhe-reserva.component';
import { CancelarReservaComponent } from './reserva/cancelar-reserva/cancelar-reserva.component';
import { EfetuarReservaComponent } from './reserva/efetuar-reserva/efetuar-reserva.component';
import { ConsultarReservaComponent } from './reserva/consultar-reserva/consultar-reserva.component';
import { FormsModule } from '@angular/forms';
import { FazerCheckinComponent } from './fazer-checkin/fazer-checkin.component';
import { ClienteLayoutComponent } from './cliente-layout/cliente-layout.component';
import { NavbarClienteComponent } from './navbar-cliente/navbar-cliente.component';
import { TimeUntilPipe } from '../shared/pipes/TimeUntilPipe';



@NgModule({
  declarations: [
    NavbarClienteComponent,
    DashboardClienteComponent,
    ComprarMilhasComponent,
    ExtratoMilhasComponent,
    DetalheReservaComponent,
    CancelarReservaComponent,
    EfetuarReservaComponent,
    ConsultarReservaComponent,
    FazerCheckinComponent,
    ClienteLayoutComponent,
    TimeUntilPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClienteRoutingModule,
    DatePipe
  ]
})
export class ClienteModule { }
