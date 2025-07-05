import { Component } from '@angular/core';
import { Funcionario } from '../../../shared/models/usuario/funcionario';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Endereco } from '../../../shared/models/usuario/endereco';
import { HttpClient } from '@angular/common/http';
import { EstadosBrasil } from '../../../shared/models/voo/estados-brasil';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrl: './editar-funcionario.component.css'
})
export class EditarFuncionarioComponent {
  funcionario: Funcionario = {};
  id: number = 0;
  errorMessage: string = "";
  estados = Object.values(EstadosBrasil);

  form: any = {
    nome: null,
    cpf: null,
    email: null,
    password: null,
    telefone: null, 
    endereco: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.funcionarioService.buscarPorId(this.id.toString()).subscribe((funcionario) => {
      this.funcionario = funcionario;
      this.form.endereco = this.funcionario.endereco;
    });
  }

  salvar(): void {
    this.funcionarioService.alterar(this.funcionario).subscribe(() => {
      this.router.navigate(['/funcionarios']);
    });
  }
}
