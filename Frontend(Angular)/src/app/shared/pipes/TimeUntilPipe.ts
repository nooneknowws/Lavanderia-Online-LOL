import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeUntil'
})
export class TimeUntilPipe implements PipeTransform {
  transform(value: Date | string): string {
    const dataVoo = value instanceof Date ? value : new Date(value);
    const agora = new Date();
    const diferenca = dataVoo.getTime() - agora.getTime();
    
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    
    if (horas < 0) return 'Voo já partiu';
    if (horas < 1) return `Em ${minutos} minutos`;
    if (horas < 24) return `Em ${horas} horas`;
    
    const dias = Math.floor(horas / 24);
    return `Em ${dias} dias e ${horas % 24} horas`;
  }
}