import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStoreService {

  constructor(public store:AngularFirestore) { }

  GuardarIngresoUsuario(nombreUsuario:string) : void
  {
    const col = this.store.collection("ingresos-usuarios");

    const objetoUsuario = { usuario: nombreUsuario, fechaIngreso: new Date() };

    col.add(objetoUsuario);
  }

  GuardarContenido(coleccion: string, datos: any)
  {
    const col = this.store.collection(coleccion);

    if(datos.length > 0)
    {
      for (const dato of datos) 
      {
        col.add(dato);  
      }
    }
    else { col.add(datos); }
  }
}
