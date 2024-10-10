import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStoreService {
  firestore = inject(AngularFirestore);
  
  constructor() {}

  GuardarIngresoUsuario(nombreUsuario:string): void
  {
    const col = this.firestore.collection("ingresos-usuarios");

    const objetoUsuario = { usuario: nombreUsuario, fechaIngreso: new Date() };
    col.add(objetoUsuario);
  }

  GuardarContenido(coleccion: string, datos: any): void
  {
    const col = this.firestore.collection(coleccion);

    if(datos.length > 0)
    {
      for (const dato of datos) { col.add(dato); }
    }
    else { col.add(datos); }
  }
}
