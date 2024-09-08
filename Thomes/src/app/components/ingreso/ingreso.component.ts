import { Component } from '@angular/core';
import { authResponse, AuthService } from '../../services/firebase-auth.service';
import { RouterService } from '../../services/router.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.scss'
})
export class IngresoComponent 
{
  public sesionIniciada:boolean;
  public usuario:string;
  public password:string;

  constructor(public firebaseAuthService:AuthService, public routerService:RouterService, public swalService:SwalService) 
  {
    this.usuario = "";
    this.password = "";
    this.sesionIniciada = false;
  }

  async IniciarSesion(usuarioIngresado:string, passIngresada:string)
  {
    const ingresoUsuario : authResponse = await this.firebaseAuthService.IniciarSesion(usuarioIngresado, passIngresada);
    if(!ingresoUsuario.huboError && ingresoUsuario.mensajeExito) 
    { 
      await this.swalService.LanzarAlert("Sesión iniciada correctamente!", "success", ingresoUsuario.mensajeExito, false, "Ir al inicio!");
      this.usuario = ""; 
      this.password = "";
      this.routerService.GoToHome();
    }
    else 
    { 
      this.sesionIniciada = false; 
      await this.swalService.LanzarAlert("Error al iniciar sesión!", "error", ingresoUsuario.mensajeError, false, "Aceptar");
    } 
  }
}  