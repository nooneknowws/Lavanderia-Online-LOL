import { Component } from '@angular/core';
import { Endereco } from '../../../shared/models/usuario/endereco';
import { EstadosBrasil } from '../../../shared/models/voo/estados-brasil';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Funcionario } from '../../../shared/models/usuario/funcionario';
import { Autenticacao } from '../../../shared/models/auth/autenticacao';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.css'
})
export class CadastrarFuncionarioComponent {
  form: any = {
    nome: null,
    cpf: null,
    email: null,
    password: null,
    telefone: null,
    endereco: new Endereco(0, '', '', '', '', '', '')
  };

  isRegistered = false;
  isRegistrationFailed = false;
  errorMessages: string[] = [];
  estados = Object.values(EstadosBrasil);

  constructor(private authService: AuthService, private http: HttpClient) { }
  onSubmit(form: NgForm): void {
    this.errorMessages = [];
    this.isRegistrationFailed = false;

    if (form.valid) {
      const { nome, cpf, email, telefone, endereco } = this.form;
      const password = this.authService.gerarSenha();

      const funcionario = new Funcionario(telefone);
      funcionario.nome = nome;
      funcionario.cpf = cpf.toString();
      funcionario.email = email;
      funcionario.senha = password;
      funcionario.endereco = endereco;
      funcionario.funcStatus = "ATIVO";

      this.authService.registerFuncionario(funcionario).subscribe({
        next: (data: Autenticacao) => {
          this.isRegistered = true;
          this.isRegistrationFailed = false;
          this.errorMessages = [];
          form.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.isRegistrationFailed = true;
          
          if (err.status === 409 && err.error?.messages) {
            this.errorMessages = err.error.messages;
          } else if (err.status === 408) {
            this.errorMessages = ['Tempo de requisição esgotado. Por favor, tente novamente.'];
          } else if (err.error?.message) {
            this.errorMessages = [err.error.message];
          } else {
            this.errorMessages = ['Erro ao realizar cadastro. Por favor, tente novamente.'];
          }
        }
      });
    }
  }
}