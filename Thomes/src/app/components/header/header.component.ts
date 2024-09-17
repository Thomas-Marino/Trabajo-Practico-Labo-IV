import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../services/router.service';
import { AuthService } from '../../services/firebase/firebase-auth.service';
import { SwalService } from '../../services/swal.service';
import { UserService } from '../../services/data/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit
{
	constructor(public router:RouterService, public authService:AuthService, public swalService:SwalService, public userService:UserService) { }

  nombreUsuario: string = "";

  ngOnInit(): void 
  {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    this.userService.nombreUsuario$.subscribe(nombre => { this.nombreUsuario = nombre; });
    // añado validación contra localStorage por si se refresca la pagina, no perder los datos del usuario logueado.
    if(usuarioLogueado !== null) { this.nombreUsuario = usuarioLogueado; }
  }

  async CerrarSesion():Promise<void>
	{
    const cerrarSesion : boolean = await this.swalService.LanzarAlert("Estás seguro/a de que deseas cerrar sesión?", "warning", "", true, "Cerrar sesión.", "Cancelar.");
    if(cerrarSesion)
    {
      this.authService.CerrarSesion();
      this.router.GoToLogin()
      this.userService.AsignarNombreUsuario(''); // Restablecer nombre de usuario
      localStorage.removeItem("usuarioLogueado");
    }
  }
}
