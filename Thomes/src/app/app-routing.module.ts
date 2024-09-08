import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

const routes: Routes = [
  {path: '', redirectTo: '/ingreso', pathMatch: 'full'},
  {path: 'ingreso', component: IngresoComponent},
  {path: 'home', component: InicioComponent},
  {path: 'quien-soy', component: QuienSoyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
