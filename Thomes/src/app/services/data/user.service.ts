import { Injectable } from '@angular/core';
import { AuthService } from '../firebase/firebase-auth.service'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(public authService:AuthService) { }

  // BehaviorSubject para emitir el nombre del usuario
  private nombreUsuarioSubject = new BehaviorSubject<string>('');
  observableNombreUsuario = this.nombreUsuarioSubject.asObservable();

  AsignarNombreUsuario(nombre: string): void 
  { 
    this.nombreUsuarioSubject.next(nombre); 
  }

  // Función para obtener el valor actual del usuario (sin necesidad de suscribirse)
  ObtenerNombreUsuario(): string 
  { 
    return this.nombreUsuarioSubject.getValue(); 
  }
}
