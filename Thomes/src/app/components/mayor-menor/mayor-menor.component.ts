import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent {

  juegoIniciado: boolean;
  valorCartaActual: number;
  valoresCartasMostrados: number[];
  mensaje: string;
  puntaje: number;
  mostrarAnimacion: boolean;

  constructor() 
  {
    this.juegoIniciado = false;
    this.valorCartaActual = 0;
    this.valoresCartasMostrados = [];
    this.mensaje = "Bienvenido a mayor o menor! Las reglas son sencillas: Al comenzar el juego, se asignará un valor de carta al azar y deberá adivinar si la proxima carta del mazo es mayor o menor a la carta sobre la mesa. Que comience el juego!";
    this.puntaje = 0;
    this.mostrarAnimacion = false;
  }

  IniciarJuego(): void
  {
    this.juegoIniciado = true;
    this.AsignarCarta();
    this.AsignarCarta();
    this.mensaje = "";
  }

  FinalizarJuego(): void
  {
    this.juegoIniciado = false;
    this.valoresCartasMostrados.length = 0;
    this.mensaje = `El juego finalizó! Su puntaje es: ${this.puntaje} puntos.`;
    this.puntaje = 0;
  }

  AsignarCarta(): void
  {
    console.log(this.valoresCartasMostrados);
    if(this.valoresCartasMostrados.length != 10)
    {
      this.valorCartaActual = Math.floor(Math.random() * (11 - 1) + 1); 
      while(!this.ValorSeEncuentraDisponible()) { this.valorCartaActual = Math.floor(Math.random() * (11 - 1) + 1); }
      this.valoresCartasMostrados.push(this.valorCartaActual);
      this.activarAnimacion();
    }
    else { this.FinalizarJuego(); }
  }

  ValorSeEncuentraDisponible(): boolean
  {
    let valorDisponible: boolean = true;

    if(this.valoresCartasMostrados.length > 0)
    {
      for (const valorMostrado of this.valoresCartasMostrados) 
      {
        if(this.valorCartaActual == valorMostrado) { valorDisponible = false; }  
      }

      return valorDisponible;
    }
    return valorDisponible;
  }

  VerificarPrediccion(prediccion: "Mayor" | "Menor")
  {
    const ultimaCarta = this.valoresCartasMostrados[this.valoresCartasMostrados.length - 2];

    switch(prediccion)
    {
      case 'Mayor':
        if(this.valorCartaActual > ultimaCarta)
        {
          console.log(this.valorCartaActual);
          console.log(ultimaCarta)
          this.puntaje++;
          this.mensaje = "Su predicción fue correcta!";
        }
        else {this.mensaje = "Su predicción fue incorrecta!"; }

        break;
      case 'Menor':
        if(this.valorCartaActual < ultimaCarta) 
        { 
          this.puntaje++; 
          this.mensaje = "Su predicción fue correcta!"; 
        }
        else {this.mensaje = "Su predicción fue incorrecta!"; }

        break;
    }
    this.AsignarCarta();
  }

  activarAnimacion(): void
  {
    this.mostrarAnimacion = true;
    setTimeout(() => {
      this.mostrarAnimacion = false;
    }, 450);
  }
}
