import { inject, Injectable } from '@angular/core';
import { FirebaseStoreService } from './firebase/firebase-store.service';
import { AuthService } from './firebase/firebase-auth.service';
import { Observable } from 'rxjs';

export interface IMensaje {
  mensaje: string;
  fechaMensaje: Date;
  fechaMensajeFormateada: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  fireStoreService = inject(FirebaseStoreService);
  fireAuthService = inject(AuthService);

  
  constructor() 
  { 
    this.fireAuthService.observableFlagUsuarioLogueado.subscribe(flag => { this.mostrarChat = flag; });
    if (localStorage.getItem("usuarioLogueado")) { this.mostrarChat = true; }
  }
  
  mostrarChat:boolean = false;

  ObtenerMensajes(): Observable<IMensaje[]>
  {
    return this.fireStoreService.store.collection<IMensaje>('mensajes', ref => ref.orderBy('fechaMensaje')).valueChanges();
  }

  async GuardarMensaje(mensaje: string): Promise<void> 
  {
    if(mensaje.trim()) 
    {
      const fecha = new Date();
      const fechaFormateada = `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()} a las ${fecha.getHours()}:${fecha.getMinutes()}`;
      const usuario: string = await this.fireAuthService.ObtenerUsuario();
      const objetoMensaje: IMensaje = { mensaje: mensaje, fechaMensaje: fecha, fechaMensajeFormateada: fechaFormateada, usuario: usuario };
      this.fireStoreService.GuardarContenido("mensajes", objetoMensaje);
    }
  }
}