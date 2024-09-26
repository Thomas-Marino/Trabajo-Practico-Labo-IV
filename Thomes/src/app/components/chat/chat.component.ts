import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatService, IMensaje } from '../../services/chat.service';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  fireStoreService = inject(FirebaseStoreService);
  chatService = inject(ChatService);
  

  observableMensajes: Observable<IMensaje[]>;
  mensaje: string = '';
  chatAbierto: boolean = false;
	// this.chat.observableNombreUsuario.subscribe(nombre => { this.nombreUsuario = nombre; });


  constructor() 
  {
    this.observableMensajes = this.chatService.ObtenerMensajes();
  }

  AlternarChat(): void 
  {
    this.chatAbierto = !this.chatAbierto;
  }

  MandarMensaje(): void 
  {
    this.chatService.GuardarMensaje(this.mensaje);
    this.mensaje = "";
  }
}