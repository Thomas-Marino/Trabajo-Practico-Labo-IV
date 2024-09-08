import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../services/router.service';
import { AuthService } from '../../services/firebase-auth.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent
{
	constructor(public router:RouterService, public authService:AuthService, public swalService:SwalService) {}

  async CerrarSesion():Promise<void>
	{
    const cerrarSesion : boolean = await this.swalService.LanzarAlert("Estás seguro/a de que deseas cerrar sesión?", "warning", "", true, "Cerrar sesión.", "Cancelar.");
    if(cerrarSesion)
    {
      this.authService.CerrarSesion();
      this.router.GoToLogin()
    }
  }

	EstoyEnIngreso()
	{
		if(this.router.GetUrl() == "/ingreso") { return true; }
		return false;
	}
}
