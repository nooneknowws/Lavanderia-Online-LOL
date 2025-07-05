import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { Voo } from '../../../shared/models/voo/voo';
import { ReservaService } from '../../../shared/services/reserva.service';
import { VooService } from '../../../shared/services/voo.service';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-confirmar-embarque',
  templateUrl: './confirmar-embarque.component.html',
  styleUrls: ['./confirmar-embarque.component.css']
})
export class ConfirmarEmbarqueComponent implements OnInit {
  codigoReservaInput: string = '';
  reserva: ReservaDTO | null = null;
  voo: Voo | null = null; 
  errorMessage: string = '';
  e = StatusReservaEnum;
  reservasVoo: ReservaDTO[] = [];

  constructor(
    private reservaService: ReservaService,
    private vooService: VooService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idVoo = this.route.snapshot.paramMap.get('id');
    if (idVoo) {
      this.getVoo(idVoo);
      this.loadReservasVoo(idVoo);
    }
  }

  loadReservasVoo(vooId: string) {
    this.reservaService.getReservasPorVoo(vooId).subscribe({
      next: (reservas) => {
        this.reservasVoo = reservas;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.errorMessage = 'Erro ao carregar as reservas do voo';
      }
    });
  }

  getReserva(codigoReserva: string) {
    if (!codigoReserva) {
      this.errorMessage = 'Por favor, digite um código de reserva';
      return;
    }

    if (!this.voo?.id) {
      this.errorMessage = 'Erro: Nenhum voo carregado';
      return;
    }

    this.errorMessage = '';
    this.reservaService.getReservaByCod(codigoReserva).subscribe({
      next: (reserva) => {
        const reservaVooId = reserva.vooId.toString();
        const vooId = this.voo?.id?.toString(); 

        if (reservaVooId !== vooId) {
          this.errorMessage = 'Esta reserva não pertence ao voo selecionado!';
          this.reserva = null;
          return;
        }

        if (reserva.status === this.e.CONFIRMADO) {
          this.reserva = reserva;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'O check in não foi realizado ou a reserva já foi processada!';
          this.reserva = null;
        }
      },
      error: (error) => {
        console.error('Error loading reservation:', error);
        this.errorMessage = 'Reserva não encontrada!';
        this.reserva = null;
      }
    });
  }

  getVoo(codigoVoo: string) {
    this.vooService.getVooById(codigoVoo).subscribe({
      next: (voo) => {
        this.voo = voo;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading flight:', error);
        this.errorMessage = 'Erro ao carregar dados do voo';
      }
    });
  }

  confirmarEmbarque() {
    if (!this.reserva) {
      return;
    }
  
    this.reservaService.confirmarEmbarque(this.reserva.id).subscribe({
      next: () => {
        alert('Embarque confirmado com sucesso!');
        if (this.voo?.id) {
          this.loadReservasVoo(this.voo.id.toString());
        }
        this.reserva = null;
      },
      error: (error) => {
        console.error('Error confirming boarding:', error);
        alert('Erro ao confirmar o embarque!');
      }
    });
  }

  voltarParaLista() {
    this.reserva = null;
    this.errorMessage = '';
  }
}