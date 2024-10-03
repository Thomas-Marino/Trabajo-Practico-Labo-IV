import { Component } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.scss'
})
export class QuienSoyComponent {
  descripcionMostrada: boolean = false;

  Expandir(): void 
  {
    this.descripcionMostrada = true;
  }

  Cerrar(): void 
  {
    this.descripcionMostrada = false;
  }
}
