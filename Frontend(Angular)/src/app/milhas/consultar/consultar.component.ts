import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../shared/services/cliente.service';
import { AuthService } from '../../shared/services/auth.service';
import { Cliente } from '../../shared/models/cliente/cliente';
import { Milhas } from '../../shared/models/cliente/milhas.model';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  cliente: Cliente | null = null;
  milhas: Milhas | undefined;

  constructor(private clienteService: ClienteService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.clienteService.getClienteById(user.id).subscribe(
        cliente => {
          this.cliente = cliente;
          this.milhas = cliente.milhas;
        },
        error => {
          console.error('Erro ao buscar informações do cliente:', error);
        }
      );
    }
  }
}
