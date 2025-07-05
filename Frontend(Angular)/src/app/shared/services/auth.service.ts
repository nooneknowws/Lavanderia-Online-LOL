import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Cliente } from '../models/cliente/cliente';
import { Usuario } from '../models/usuario/usuario';
import { Funcionario } from '../models/usuario/funcionario';
import { Autenticacao } from '../models/auth/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private token: string | null = null;
  private refreshToken: string | null = null;
  private sessionTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeServiceState();
  }

  ngOnDestroy(): void {
    clearTimeout(this.sessionTimer);
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem(this.TOKEN_KEY) || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private initializeServiceState(): void {
    try {
      const storedToken = localStorage.getItem(this.TOKEN_KEY);
      const storedRefreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
      const storedUser = localStorage.getItem(this.USER_KEY);

      if ((!storedToken && storedUser) || (storedToken && !storedUser)) {
        this.clearSession();
      } else if (storedToken && storedUser) {
        this.token = storedToken;
        this.refreshToken = storedRefreshToken;
        const parsedUser = JSON.parse(storedUser);
        this.currentUserSubject.next(parsedUser);
        this.startSessionTimer();
      }
    } catch (error) {
      this.clearSession();
    }
  }
  getUser(): Usuario | null {
    return this.currentUserSubject.value;
  }
  private startSessionTimer(): void {
    this.sessionTimer = setTimeout(() => {
      this.refreshAuthToken().subscribe();
    }, this.SESSION_TIMEOUT);
  }
  setUser(user: Usuario): void {
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  

  login(email: string, senha: string): Observable<Cliente | Funcionario | null> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }, this.getHttpOptions()).pipe(
      map(response => {
        if (response.status === 'success' && response.token) {
          const user = response.perfil === 'Cliente' ? new Cliente() : new Funcionario();
          user.id = response.id;
          user.email = response.email;
          user.perfil = response.perfil;
          this.setSessionData(response.token, response.refreshToken, user);
          return user;
        }
        return null;
      }),
      catchError(this.handleError)
    );
  }

  private setSessionData(token: string, refreshToken: string, user: Usuario): void {
    this.token = token;
    this.refreshToken = refreshToken;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.startSessionTimer();
  }

  public refreshAuthToken(): Observable<any> {
    if (!this.refreshToken) return throwError(() => new Error('No refresh token available'));

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken: this.refreshToken }, this.getHttpOptions()).pipe(
      tap(response => {
        if (response.token) {
          this.token = response.token;
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.startSessionTimer();
        }
      }),
      catchError(this.handleError)
    );
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.currentUserSubject.value;
  }

  logout(): Observable<any> {
    if (!this.token) {
      this.clearSession();
      return of(null);
    }
  
    return this.http.post(`${this.apiUrl}/logout`, { token: this.token }, this.getHttpOptions()).pipe(
      tap(() => this.clearSession()),
      catchError(this.handleError)
    );
  }
  

  private clearSession(): void {
    this.token = null;
    this.refreshToken = null;
    this.currentUserSubject.next(null);
    localStorage.clear();
    clearTimeout(this.sessionTimer);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getToken(): string | null {
    return this.token;
  }

  getCliente(id: string | undefined): Observable<Cliente> {
    const idNumber = id ? Number(id) : NaN;
    if (isNaN(idNumber)) {
      throw new Error('Invalid ID');
    }

    return this.http.get<Cliente>(`${this.apiUrl}/clientes/busca/${idNumber}`, this.getHttpOptions());
  }

  getFuncionario(id: string | undefined): Observable<Funcionario> {
    const idNumber = id ? Number(id) : NaN;
    if (isNaN(idNumber)) {
      throw new Error('Invalid ID');
    }

    return this.http.get<Funcionario>(`${this.apiUrl}/funcionarios/${idNumber}`, this.getHttpOptions());
  }

  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser && 'milhas' in currentUser ? 'cliente' : 'funcionario';
  }

  gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  registerCliente(cliente: Cliente): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/clientes/cadastro`, cliente, this.getHttpOptions());
  }

  registerFuncionario(funcionario: Funcionario): Observable<Autenticacao> {
    funcionario.funcStatus = 'ATIVO';
    funcionario.perfil = 'Funcionario';
    return this.http.post<Autenticacao>(`${this.apiUrl}/funcionarios/cadastro`, funcionario, this.getHttpOptions());
  }
}
