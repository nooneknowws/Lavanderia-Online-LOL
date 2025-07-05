import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-layout',
  templateUrl: './cliente-layout.component.html',
  styleUrls: ['./cliente-layout.component.css']
})
export class ClienteLayoutComponent implements OnInit {

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
    return this.router.url === '/cliente';
  }
}
