import { Component } from '@angular/core';
import { authResponse, AuthService } from '../../services/firebase/firebase-auth.service';
import { RouterService } from '../../services/router.service';
import { SwalService } from '../../services/swal.service';
import { UserService } from '../../services/data/user.service';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.scss'
})
export class IngresoComponent 
{
  public usuario:string;
  public password:string;

  constructor(public firebaseAuthService:AuthService, public firebaseStoreService:FirebaseStoreService, public routerService:RouterService, public swalService:SwalService, public userService:UserService) 
  {
    this.usuario = "";
    this.password = "";
  }

  async IniciarSesion(usuarioIngresado:string, passIngresada:string)
  {
    const ingresoUsuario : authResponse = await this.firebaseAuthService.IniciarSesion(usuarioIngresado, passIngresada);
    if(!ingresoUsuario.huboError && ingresoUsuario.mensajeExito) 
    { 
      await this.swalService.LanzarAlert("Sesión iniciada correctamente!", "success", ingresoUsuario.mensajeExito, false, "Ir al inicio!");
      this.usuario = ""; 
      this.password = "";
      this.userService.AsignarNombreUsuario(await this.firebaseAuthService.ObtenerUsuario());
      this.firebaseStoreService.GuardarIngresoUsuario(await this.firebaseAuthService.ObtenerUsuario());
      localStorage.setItem("usuarioLogueado", await this.firebaseAuthService.ObtenerUsuario());
      this.routerService.GoToHome();
    }
    else 
    { 
      await this.swalService.LanzarAlert("Error al iniciar sesión!", "error", ingresoUsuario.mensajeError, false, "Aceptar");
    } 
  }

  InicioSesionRapido(tipoUsuario:string) : void
  {
    switch(tipoUsuario)
    {
      case "prueba":
        this.usuario = "prueba@gmail.com";
        this.password = "prueba";
        break
      default:
        this.usuario = "prueba@gmail.com";
        this.password = "prueba";
        break
    }
  }
}  