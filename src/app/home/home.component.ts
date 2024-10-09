import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Aquí se declara el archivo CSS
})
export class HomeComponent {
  destination: string = '';
  dates: string = '';
  guests: string = '';

  constructor() {}

  search() {
    console.log('Buscando hoteles en:', this.destination, 'con fechas:', this.dates, 'para:', this.guests);
  }

  logout() {
    console.log('Cerrar sesión');
  }
}
