import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { InicioComponent } from './autenticacao/inicio/inicio.component';
import { AuthGuard } from './shared/auth.guard';

const publicRoutes: Routes = [
  {
    path: '',
    component: InicioComponent,
    data: { title: 'Início' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    data: { title: 'Cadastro' }
  }
];

const protectedRoutes: Routes = [
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module')
      .then(m => m.ClienteModule),
    canActivate: [AuthGuard],
    data: { 
      role: 'cliente',
      title: 'Área do Cliente'
    }
  },
  {
    path: 'funcionario',
    loadChildren: () => import('./funcionario/funcionario.module')
      .then(m => m.FuncionarioModule),
    canActivate: [AuthGuard],
    data: { 
      role: 'funcionario',
      title: 'Área do Funcionário'
    }
  }
];
const routes: Routes = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}