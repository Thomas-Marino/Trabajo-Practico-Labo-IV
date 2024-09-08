import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../services/router.service';
import { AuthService } from '../../services/firebase-auth.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit
{
	constructor(public router:RouterService, public authService:AuthService, public swalService:SwalService) {}

  nombreUsuario: string = "";

  ngOnInit(): void 
  {
    this.ObtenerUsuario();
    console.log(this.authService.ObtenerUsuario())
  }

  async ObtenerUsuario() // Creo una función obtener usuario nuevamente para que oninit no sea async.
  {
    this.nombreUsuario = await this.authService.ObtenerUsuario();
  }

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
