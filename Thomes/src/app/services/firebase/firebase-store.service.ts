import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStoreService {

  constructor(public fireStore:AngularFirestore) { }

  GuardarIngresoUsuario(nombreUsuario:string) : void
  {
    const col = this.fireStore.collection("ingresos-usuarios");

    const objetoUsuario = { usuario: nombreUsuario, fechaIngreso: new Date() };

    col.add(objetoUsuario);
  }
}
