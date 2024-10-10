import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/data/user.service';

export const soloUsuarioGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let routerService = inject(RouterService);

  if(userService.ObtenerNombreUsuario().trim() != "") {return true;}
  else 
  {
    routerService.GoTo401Unauthorized();
    return false;
  }
};