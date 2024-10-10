import { inject, Injectable } from '@angular/core';
import { FirebaseStoreService } from '../firebase/firebase-store.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

export interface IPuntaje {
  fecha: string;
  juego: string;
  nombreUsuario: string;
  puntajeUsuario: number;
}

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  firestoreService = inject(FirebaseStoreService);
  userService = inject(UserService);

  constructor() { }

  GuardarPuntaje(puntaje: number, juego: string): void
  {
    const fecha = new Date();
    const fechaFormateada = `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}`;
    const datosPuntaje = {nombreUsuario: this.userService.ObtenerNombreUsuario(), puntajeUsuario: puntaje, juego: juego, fecha: fechaFormateada};
    this.firestoreService.GuardarContenido("Puntajes", datosPuntaje);
  }

  ObtenerPuntajes(juego: string): Observable<IPuntaje[]>
  {
    return this.firestoreService.firestore.collection<IPuntaje>("Puntajes", ref => ref.where("juego", "==", juego).orderBy("puntajeUsuario", "desc")).valueChanges();
  }
}
