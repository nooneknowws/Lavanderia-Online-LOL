import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reserva } from '../models/reserva/reserva';
import { Observable, tap } from 'rxjs';
import { StatusReservaEnum } from '../models/reserva/status-reserva.enum';
import { Aeroporto } from '../models/voo/aeroporto';
import { Voo } from '../models/voo/voo';
import { ReservaDTO } from '../models/reserva/reservaDTO';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
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

  getReservas(): Observable<ReservaDTO[]> {
    return this.http.get<ReservaDTO[]>(`${this.apiUrl}/reservas`, this.getHttpOptions());
  }

  getAeroportos(): Observable<Aeroporto[]>{
    return this.http.get<Aeroporto[]>(`${this.apiUrl}/api/aeroportos`, this.getHttpOptions());
  }

  getVoosFiltrados(aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto): Observable<Voo[]> {
    const params = new HttpParams()
        .set('origem', aeroportoOrigem.codigo!)
        .set('destino', aeroportoDestino.codigo!);

    return this.http.get<Voo[]>(`${this.apiUrl}/voos/filter`, {
        headers: this.getHttpOptions().headers,
        params: params
    });
}
getReservasByClienteId(clienteId: string): Observable<ReservaDTO[]> {
  console.log('Calling API for clientId:', clienteId);
  const url = `${this.apiUrl}/reservas/cliente/${clienteId}`;
  console.log('Request URL:', url);
  
  return this.http.get<ReservaDTO[]>(url, this.getHttpOptions()).pipe(
    tap({
      next: (response) => console.log('Raw API Response:', response),
      error: (error) => console.error('API Error:', error)
    })
  );
}
getReservasPorVoo(vooId: string): Observable<ReservaDTO[]> {
  const url = `${this.apiUrl}/reservas/voo/${vooId}`;
  console.log('Fetching reservas for flight:', vooId);
  
  return this.http.get<ReservaDTO[]>(url, this.getHttpOptions()).pipe(
    tap({
      next: (response) => console.log('Flight reservations received:', response),
      error: (error) => console.error('Error fetching flight reservations:', error)
    })
  );
}
getReservaByCod(id: string): Observable<ReservaDTO> {
  return this.http.get<ReservaDTO>(`${this.apiUrl}/reservas/codigo/${id}`, this.getHttpOptions());
}
  getReservaById(id: string): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}`;
    console.log('Fetching reserva details for ID:', id);
    
    return this.http.get<ReservaDTO>(url, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Reserva details received:', response),
        error: (error) => console.error('Error fetching reserva details:', error)
      })
    );
  }
  getProximasReservas(clienteId: string): Observable<ReservaDTO[]> {
    const url = `${this.apiUrl}/reservas/cliente/${clienteId}/filter-data`;
    console.log('Fetching upcoming reservations for client:', clienteId);
    
    return this.http.get<ReservaDTO[]>(url, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Upcoming reservations received:', response),
        error: (error) => console.error('Error fetching upcoming reservations:', error)
      })
    );
  }
  efetuar(reservaDTO: ReservaDTO): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/reservas`, reservaDTO, this.getHttpOptions());
  }

  confirmarReserva(id: number): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}/checkin`;
    console.log('Confirming reservation with ID:', id);
    
    return this.http.put<ReservaDTO>(url, {}, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Reservation confirmation response:', response),
        error: (error) => console.error('Error confirming reservation:', error)
      })
    );
  }

  cancelarReserva(id: number): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}/cancelar`;
    console.log('Canceling reservation with ID:', id);
    
    return this.http.put<ReservaDTO>(url, {}, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Reservation cancellation response:', response),
        error: (error) => console.error('Error canceling reservation:', error)
      })
    );
  }

  confirmarEmbarque(id: number): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}/embarque`;
    console.log('Confirming boarding for reservation ID:', id);
    
    return this.http.put<ReservaDTO>(url, {}, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Boarding confirmation response:', response),
        error: (error) => console.error('Error confirming boarding:', error)
      })
    );
  }
}