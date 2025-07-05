import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Usuario } from '../../shared/models/usuario/usuario';
import { Funcionario } from '../../shared/models/usuario/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    senha: ''
  };

  isLoggedIn = false;
  isLoginFailed = false;
  isLoading = false;
  errorMessage = '';
  user: Usuario = {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.user = user;
        this.redirectBasedOnUserType(user);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true; 
      const { email, senha } = this.form;
      
      this.authService.login(email, senha).subscribe({
        next: (user: Cliente | Funcionario | null) => {
          this.isLoading = false;
          if (user) {
            this.isLoggedIn = true;
            this.isLoginFailed = false;
            this.user = user;
            this.redirectBasedOnUserType(user);
          } else {
            this.handleLoginError('Credenciais inválidas');
          }
        },
        error: (err) => {
          this.isLoading = false;
          let errorMessage = 'Erro ao realizar o login';
          
          if (err.status === 404 && err.error?.message === "Funcionario está INATIVO") {
            errorMessage = "Funcionario está INATIVO";
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }
          
          this.handleLoginError(errorMessage);
        }
      });
    }
  }

  private redirectBasedOnUserType(user: Usuario): void {
    if (user.perfil == "Cliente") {
      this.router.navigate(['/cliente']);
    } else if (user.perfil == "Funcionario") {
      this.router.navigate(['/funcionario']);
    }
  }

  private handleLoginError(message: string): void {
    this.errorMessage = message;
    this.isLoginFailed = true;
    this.isLoggedIn = false;
  }
}