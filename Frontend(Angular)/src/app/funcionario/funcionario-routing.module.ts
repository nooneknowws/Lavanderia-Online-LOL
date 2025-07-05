import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarEmbarqueComponent } from './voo/confirmar-embarque/confirmar-embarque.component';
import { CancelarVooComponent } from './voo/cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './voo/realizar-voo/realizar-voo.component';
import { CadastrarVooComponent } from './voo/cadastrar-voo/cadastrar-voo.component';
import { ListarFuncionarioComponent } from './_crud/listar-funcionario/listar-funcionario.component';
import { CadastrarFuncionarioComponent } from './_crud/cadastrar-funcionario/cadastrar-funcionario.component';
import { AuthGuard } from '../shared/auth.guard';
import { EditarFuncionarioComponent } from './_crud/editar-funcionario/editar-funcionario.component';
import { FuncionarioLayoutComponent } from './funcionario-layout/funcionario-layout.component';
import { InicioComponent } from '../autenticacao/inicio/inicio.component';
import { DashboardFuncionarioComponent } from './dashboard-funcionario/dashboard-funcionario.component';

const routes: Routes = [
  {
    path: 'funcionario',
    component: FuncionarioLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'funcionario' },
    children: [
      { path: '', component: DashboardFuncionarioComponent },
      { path: 'confirmar-embarque/:id', component: ConfirmarEmbarqueComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } },
      { path: 'cancelar-voo/:id', component: CancelarVooComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } },
      { path: 'realizar-voo/:id', component: RealizarVooComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } },
      { path: 'cadastrar-voo', component: CadastrarVooComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } },
      { path: 'listar-funcionarios', component: ListarFuncionarioComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } },
      { path: 'cadastrar-funcionario', component: CadastrarFuncionarioComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } },
      { path: 'editar-funcionario/:id', component: EditarFuncionarioComponent, canActivate: [AuthGuard], data: { role: 'funcionario' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
