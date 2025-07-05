import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-funcionario-layout',
  templateUrl: './funcionario-layout.component.html',
  styleUrl: './funcionario-layout.component.css'
})
export class FuncionarioLayoutComponent {
  linkVoltarVisivel: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.linkVoltarVisivel = !this.isRotaInicial();
    });
  }

  voltar() {
    history.back();
  }

  isRotaInicial(): boolean {
    return this.router.url === '/funcionario';
  }
}
