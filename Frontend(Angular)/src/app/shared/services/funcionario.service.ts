import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { Funcionario } from '../models/usuario/funcionario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Autenticacao } from '../models/auth/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl: string = `${AppComponent.PUBLIC_BACKEND_URL}/funcionarios`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  private validateAndConvertId(id: string | number | undefined): number {
    if (id == null) {
      throw new Error('ID é obrigatório');
    }

    const idString = id.toString().trim();

    if (!idString) {
      throw new Error('ID não pode estar vazio');
    }

    const numericId = Number(idString);

    if (!Number.isFinite(numericId) || !Number.isInteger(numericId) || numericId <= 0) {
      throw new Error('ID deve ser um número inteiro positivo');
    }

    return numericId;
  }

  private getRequestOptions() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('Token de autenticação não disponível');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
      return throwError(() => new Error('Sessão expirada. Por favor, faça login novamente.'));
    }
    return throwError(() => new Error(error.error?.message || 'Ocorreu um erro. Por favor, tente novamente.'));
  }

  private request<T>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, body?: any): Observable<T> {
    const options = this.getRequestOptions();
    const url = `${this.apiUrl}${endpoint}`;

    let request: Observable<T>;
    switch (method) {
      case 'get':
        request = this.http.get<T>(url, options);
        break;
      case 'post':
        request = this.http.post<T>(url, body, options);
        break;
      case 'put':
        request = this.http.put<T>(url, body, options);
        break;
      case 'delete':
        request = this.http.delete<T>(url, options);
        break;
      default:
        throw new Error('Método HTTP não suportado');
    }

    return request.pipe(
      retry(1),
      catchError(error => this.handleError(error))
    );
  }

  listarTodos(): Observable<Funcionario[]> {
    return this.request<Funcionario[]>('get', '');
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.authService.registerFuncionario(funcionario).pipe(
      switchMap((authResponse: Autenticacao) => {
        if (authResponse.user) {
          return new Observable<Funcionario>(observer => {
            observer.next(authResponse.user as Funcionario);
            observer.complete();
          });
        }
        throw new Error('Registro realizado com sucesso, mas os dados do usuário não foram retornados');
      }),
      catchError(error => {
        console.error('Erro durante o registro do funcionário:', error);
        throw error;
      })
    );
  }

  alterar(funcionario: Funcionario): Observable<Funcionario> {
    try {
      const numericId = this.validateAndConvertId(funcionario.id);
      return this.request<Funcionario>('put', `/edit/${numericId}`, funcionario);
    } catch (error) {
      return throwError(() => error);
    }
  }

  desativarFuncionario(id: string | number | undefined): Observable<Funcionario> {
    try {
      const numericId = this.validateAndConvertId(id);
      return this.request<Funcionario>('put', `/status/${numericId}`);
    } catch (error) {
      return throwError(() => error);
    }
  }

  buscarPorId(id: string | number): Observable<Funcionario> {
    try {
      const numericId = this.validateAndConvertId(id);
      return this.request<Funcionario>('get', `/${numericId}`);
    } catch (error) {
      return throwError(() => error);
    }
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
}
