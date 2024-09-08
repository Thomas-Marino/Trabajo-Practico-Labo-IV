import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  async LanzarAlert(titulo:string, icono: SweetAlertIcon, mensaje:string = "", mostrarCancel:boolean = false, mensajeConfirm:string = "Confirmar", mensajeCancel:string = "Cancelar") : Promise<boolean>
  {
    let alertConfirmado = false;
    
    await Swal.fire({ title: titulo, icon: icono, text: mensaje, showCancelButton: mostrarCancel, confirmButtonColor: "#3085d6", confirmButtonText: mensajeConfirm, cancelButtonText: mensajeCancel})
    .then((result) => {
      if (result.isConfirmed) { alertConfirmado = true;}
    });

    if(alertConfirmado) { return true; }
    console.log("return false")
    return false;
  }
}
