import { Component, inject } from '@angular/core';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';
import { IPuntaje, PuntajesService } from '../../services/data/puntajes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabla-puntajes',
  templateUrl: './tabla-puntajes.component.html',
  styleUrl: './tabla-puntajes.component.scss'
})
export class TablaPuntajesComponent {
  fireStoreService = inject(FirebaseStoreService);
  puntajesService = inject(PuntajesService);
  mostrarTabla: boolean;
  observablePuntajes!: Observable<IPuntaje[]>;

  constructor() 
  {
    this.mostrarTabla = false;
  }

  CambiarTablaDePuntajes(juego: string): void
  {
    this.observablePuntajes = this.puntajesService.ObtenerPuntajes(juego);
    this.mostrarTabla = true;
    this.observablePuntajes.forEach(valor => console.log(valor))
  }
}
