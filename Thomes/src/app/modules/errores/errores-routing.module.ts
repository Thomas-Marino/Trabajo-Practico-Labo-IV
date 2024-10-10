import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErroresComponent } from './errores.component';
import { UnauthorizedComponent } from '../../components/errores/unauthorized/unauthorized.component';
import { NotFoundComponent } from '../../components/errores/not-found/not-found.component';

const routes: Routes = [
  { path: '401', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }    // Ruta comodín en el módulo de errores
  // { path: 'game-guessr', component: GameGuessrComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErroresRoutingModule { }
