import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voo } from '../models/voo/voo';

@Injectable({
  providedIn: 'root'
})
export class VooService {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  
  constructor(private http: HttpClient) {}

  getVoos(): Observable<Voo[]> {
    return this.http.get<Voo[]>(`${this.apiUrl}/voos`);
  }

  getVoosProximas48Horas(): Observable<Voo[]> {
    return this.http.get<Voo[]>(`${this.apiUrl}/voos/proximas-48h`);
  }

  getVooById(id: string): Observable<Voo> {
    return this.http.get<Voo>(`${this.apiUrl}/voos/` + id);
  }

  atualizarStatus(id: string, status: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/voos/${id}/status`,
      null,
      {
        params: { status },
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  confirmarEmbarque(id: string): Observable<void> {
    return this.atualizarStatus(id, 'CONFIRMADO');
  }

  cancelarVoo(id: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/voos/${id}/cancelar`,
      null,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  realizarVoo(id: string): Observable<void> {
    return this.atualizarStatus(id, 'REALIZADO');
  }

  cadastrarVoo(voo: Voo): Observable<any> {
    return this.http.post(`${this.apiUrl}/voos`, {
      ...voo,
      status: 'CONFIRMADO',
      codigoOrigem: voo.origem?.codigo,
      codigoDestino: voo.destino?.codigo
    });
  }
}