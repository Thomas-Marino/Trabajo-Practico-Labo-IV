import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatService, IMensaje } from '../../services/chat.service';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';
import { AuthService } from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  fireStoreService = inject(FirebaseStoreService);
  fireAuthService = inject(AuthService);
  chatService = inject(ChatService);

  observableMensajes: Observable<IMensaje[]>;
  mensaje: string = '';
  chatAbierto: boolean = false;
  usuarioLogueado: string = "";

  constructor() { this.observableMensajes = this.chatService.ObtenerMensajes(); }

  async ngOnInit(): Promise<void> {
    this.usuarioLogueado = await this.fireAuthService.ObtenerUsuario();
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