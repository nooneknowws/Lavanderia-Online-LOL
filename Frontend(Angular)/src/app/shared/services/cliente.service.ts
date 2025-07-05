import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { Milhas } from '../models/cliente/milhas';
import { MilhasDTO } from '../models/cliente/milhasDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient) {}

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('auth_token') || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
  }

  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/busca/${id}`, this.getHttpOptions()).pipe(
      catchError(error => {
        console.error('Error fetching cliente:', error);
        throw error;
      })
    );
  }
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  processarTransacaoMilhas(valorEmReais: number, quantidade: number, tipo: 'ENTRADA' | 'SAIDA', clienteId: string, descricao: string): Observable<Milhas> {
    const milhasDTO = {
      clienteId: Number(clienteId), 
      quantidade: quantidade,
      entradaSaida: tipo,
      valorEmReais: valorEmReais,
      descricao: descricao
    };
  
    return this.http.post<Milhas>(
      `${this.apiUrl}/api/milhas`, 
      milhasDTO,
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Error processing miles transaction:', error);
        throw error;
      })
    );
  }

  listarTransacoes(clienteId: string): Observable<Milhas[]> {
    return this.http.get<Milhas[]>(
      `${this.apiUrl}/api/milhas/${clienteId}`,
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Error fetching transactions:', error);
        throw error;
      })
    );
  }
}