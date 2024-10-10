import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroresRoutingModule } from './errores-routing.module';
import { ErroresComponent } from './errores.component';


@NgModule({
  declarations: [
    ErroresComponent
  ],
  imports: [
    CommonModule,
    ErroresRoutingModule
  ]
})
export class ErroresModule { }
