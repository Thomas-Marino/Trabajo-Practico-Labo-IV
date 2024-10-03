import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../../components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from '../../components/mayor-menor/mayor-menor.component';
import { GameGuessrComponent } from '../../components/game-guessr/game-guessr.component';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'mayor-menor', component: MayorMenorComponent },
  { path: 'game-guessr', component: GameGuessrComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
