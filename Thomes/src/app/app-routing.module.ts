import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TablaPuntajesComponent } from './components/tabla-puntajes/tabla-puntajes.component';
import { soloUsuarioGuard } from './guards/solo-usuario.guard';
import { NotFoundComponent } from './components/errores/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'ingreso', component: IngresoComponent},
  {path: 'home', component: InicioComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'quien-soy', component: QuienSoyComponent},
  {path: 'ranking', component: TablaPuntajesComponent},
  {path: 'juegos', canActivate: [soloUsuarioGuard], loadChildren: () => import('./modules/juegos/juegos-routing.module').then(m => m.JuegosRoutingModule)},
  {path: 'errores', loadChildren: () => import('./modules/errores/errores-routing.module').then(m => m.ErroresRoutingModule) },
  { path: '**', redirectTo: '/errores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
