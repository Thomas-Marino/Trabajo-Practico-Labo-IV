import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(public router:Router) { }

  GetUrl(): string
  {
    return this.router.url;
  }

  GoToHome(): void
  {
    this.router.navigateByUrl("home");
  }

  GoToQuienSoy(): void
  {
    this.router.navigateByUrl("quien-soy");
  }

  GoToLogin(): void
  {
    this.router.navigateByUrl("ingreso");
  }

  GoToRanking(): void
  {
    this.router.navigateByUrl("ranking");
  }

  GoTo401Unauthorized(): void
  {
    this.router.navigateByUrl("/errores/401");
  }

  GoTo404NotFound(): void
  {
    this.router.navigateByUrl("/errores/404")
  }
}
