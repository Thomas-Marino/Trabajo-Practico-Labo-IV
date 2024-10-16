import { Component, inject } from '@angular/core';
import { UserService } from '../../services/data/user.service';
import { PuntajesService } from '../../services/data/puntajes.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent 
{
  puntajeService = inject(PuntajesService);

  juegoIniciado: boolean;
  valorCartaActual: number;
  valoresCartasMostrados: number[];
  imagenesCartasMostrados: string[];
  idMazo: string;
  mensaje: string;
  puntaje: number;
  mostrarAnimacion: boolean;
  cartasRestantes: number;

  constructor() 
  {
    this.juegoIniciado = false;
    this.valorCartaActual = 0;
    this.valoresCartasMostrados = [];
    this.imagenesCartasMostrados = [];
    this.idMazo = "";
    this.mensaje = "Bienvenido a mayor o menor! Las reglas son sencillas: Al comenzar el juego, se asignará un valor de carta al azar y deberá adivinar si la proxima carta del mazo es mayor o menor a la carta sobre la mesa. Que comience el juego!";
    this.puntaje = 0;
    this.mostrarAnimacion = false;
    this.cartasRestantes = 0;
  }

  async IniciarJuego(): Promise<void>
  {
    const req = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const res = await req.json();
    
    this.idMazo = res.deck_id;
    this.juegoIniciado = true;
    this.AsignarCarta();
    this.AsignarCarta();
    this.mensaje = "";
    this.puntaje = 0;
    this.valoresCartasMostrados.length = 0;
  }

  FinalizarJuego(): void
  {
    this.juegoIniciado = false;
    this.mensaje = `El juego finalizó! Su puntaje es: ${this.puntaje} puntos.`;
    this.puntajeService.GuardarPuntaje(this.puntaje, "Mayor Menor");
  }

  async AsignarCarta(): Promise<void>
  {
    const req = await fetch(`https://deckofcardsapi.com/api/deck/${this.idMazo}/draw/?count=1`);
    const res = await req.json()

    if(res.remaining > 0)
    {
      this.cartasRestantes = res.remaining;
      switch (res.cards[0].value)
      {
        case "JACK":
          this.valorCartaActual = 11;
          break;
        case "QUEEN":
          this.valorCartaActual = 12;
          break;
        case "KING":
          this.valorCartaActual = 13;
          break;
        case "ACE":
          this.valorCartaActual = 14;
          break;
        default:
          this.valorCartaActual = parseInt(res.cards[0].value);
          break;
      }
  
      this.valoresCartasMostrados.push(this.valorCartaActual);
      this.imagenesCartasMostrados.push(res.cards[0].image);
      this.activarAnimacion();
    }
    else { this.FinalizarJuego(); }
  }

  VerificarPrediccion(prediccion: "Mayor" | "Menor")
  {
    const ultimaCarta = this.valoresCartasMostrados[this.valoresCartasMostrados.length - 2];

    switch(prediccion)
    {
      case 'Mayor':
        if(this.valorCartaActual > ultimaCarta)
        {
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
