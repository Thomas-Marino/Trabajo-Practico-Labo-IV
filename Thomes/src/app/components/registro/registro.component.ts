import { Component } from '@angular/core';
import { AuthService } from '../../services/firebase/firebase-auth.service';
import { SwalService } from '../../services/swal.service';
import { UserService } from '../../services/data/user.service';
import { RouterService } from '../../services/router.service';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrl: './registro.component.scss'
})
export class RegistroComponent 
{
	constructor(public firebaseAuthService:AuthService, public firebaseStoreService:FirebaseStoreService, public swalService:SwalService, public userService:UserService, public routerService:RouterService) 
	{
		this.correo = "";
		this.password = "";
	}

	correo:string;
	password:string;

	async RegistrarUsuario(correoIngresado:string, passwordIngresado:string): Promise<void>
	{
		const registroUsuario = await this.firebaseAuthService.RegistrarNuevoUsuario(correoIngresado, passwordIngresado);

		if(!registroUsuario.huboError && registroUsuario.mensajeExito) 
		{ 
			await this.swalService.LanzarAlert("Sesión iniciada correctamente!", "success", registroUsuario.mensajeExito, false, "Ir al inicio!");
			this.correo = ""; 
			this.password = "";
			this.userService.AsignarNombreUsuario(await this.firebaseAuthService.ObtenerUsuario());
			this.firebaseStoreService.GuardarIngresoUsuario(await this.firebaseAuthService.ObtenerUsuario());
			localStorage.setItem("usuarioLogueado", await this.firebaseAuthService.ObtenerUsuario());
			this.routerService.GoToHome();
		}
		else { await this.swalService.LanzarAlert("Error al registrar el usuario!", "error", registroUsuario.mensajeError, false, "Aceptar"); } 
	}
}
