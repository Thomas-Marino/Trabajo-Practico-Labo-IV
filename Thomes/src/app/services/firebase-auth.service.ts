import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, User } from '@angular/fire/auth';
import { RouterService } from './router.service';

export interface authResponse
{
	huboError : boolean;
	mensajeError? : string;
	mensajeExito? : string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth, public router:RouterService) { }

	async RegistrarNuevoUsuario(correo:string, password:string) : Promise<authResponse> 
	{
		let authResponse:authResponse = {huboError: false};
		try
		{
			const responseRegistro = await this.auth.createUserWithEmailAndPassword(correo, password).catch((error:FirebaseError) => {
				if(error.code == "auth/invalid-email") { error.message = "Asegurese de ingresar un email válido (ejemplo@correo.com)"; }
				else if(error.code == "auth/missing-password") { error.message = "Asegurese de ingresar una contraseña"; }
				else if(error.code == "auth/weak-password") { error.message = "La contraseña debe tener al menos 6 carácteres"; }
				error.stack = ""; 
				authResponse.huboError = true;
				authResponse.mensajeError = error.message;
			});

			if(responseRegistro)
			{
				console.log(`Usuario registrado existosamente! Correo: ${responseRegistro.user?.email}`);
				authResponse.mensajeExito = "Usuario registrado existosamente!";
				return authResponse;
			}

			return authResponse;
		}
		catch(error:any)
		{
			console.error(error)
			authResponse.huboError = true;
			authResponse.mensajeError = error;
			return authResponse;
		}
	}

	ObtenerSesion() : User | null
	{
		return getAuth().currentUser;
	}

	async IniciarSesion(correo:string, password:string) : Promise<authResponse>
	{
		let authResponse:authResponse = {huboError: false};
		try
		{
			const loginResponse = await this.auth.signInWithEmailAndPassword(correo, password).catch((error:FirebaseError) => {
				if(error.code == "auth/invalid-email") { error.message = "Asegurese de ingresar un email válido (ejemplo@correo.com)"; }
				else if(error.code == "auth/missing-password") { error.message = "Asegurese de ingresar una contraseña"; }
				else if(error.code == "auth/invalid-credential") { error.message = "Credenciales invalidas, verifique si el correo y la contraseña fueron ingresados correctamente"; }
				error.stack = ""; 
				authResponse.huboError = true;
				authResponse.mensajeError = error.message;
			});

			if(loginResponse)
			{
				console.log(`Usuario logueado existosamente! Correo: ${loginResponse.user?.email}`);
				authResponse.mensajeExito = "Usuario logueado existosamente!";
				return authResponse;
			}

			return authResponse;
		}
		catch(error:any)
		{
			console.error(error)
			authResponse.huboError = true;
			authResponse.mensajeError = error;
			return authResponse;
		}   
	}

	async CerrarSesion() : Promise<void>
	{
		if(this.ObtenerSesion())
		{
			this.auth.signOut();
			this.router.GoToLogin();
		}
		else
		{
			console.log("No hay ninguna sesion activa");
		}
	}
}