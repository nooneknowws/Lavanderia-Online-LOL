import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../shared/models/usuario/funcionario';
import { Voo } from '../../../shared/models/voo/voo';
import { VooService } from '../../../shared/services/voo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-realizar-voo',
  templateUrl: './realizar-voo.component.html',
  styleUrls: ['./realizar-voo.component.css']
})
export class RealizarVooComponent implements OnInit {
  user: Funcionario | null = null;
  voo: Voo | null = null;
  codigoVooInput: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private vooService: VooService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    const idVoo = this.route.snapshot.paramMap.get('id');
    if (idVoo) {
      this.getVoo(idVoo);
    }
  }

  getVoo(codigoVoo: string) {
    this.loading = true;
    this.vooService.getVoos().subscribe({
      next: (voos) => {
        const vooEncontrado = voos.find(voo => voo.codigoVoo === codigoVoo);
        if (vooEncontrado) {
          this.voo = vooEncontrado;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Voo não encontrado!';
          this.voo = null;
        }
      },
      error: (error) => {
        console.error('Erro ao buscar voo:', error);
        this.errorMessage = 'Erro ao buscar voo. Tente novamente.';
        this.voo = null;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  realizarVoo() {
    if (!this.voo || this.loading) return;
    
    this.loading = true;
    this.vooService.realizarVoo(this.voo.id!).subscribe({
      next: () => {
        alert('Voo realizado com sucesso!');
        this.voo = null;
      },
      error: (error) => {
        console.error('Erro ao realizar voo:', error);
        alert('Erro ao realizar o voo!');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}