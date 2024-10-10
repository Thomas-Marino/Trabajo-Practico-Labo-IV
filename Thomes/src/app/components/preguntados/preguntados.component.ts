import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PuntajesService } from '../../services/data/puntajes.service';

type Categoria = "geography" | "arts%26literature" | "entertainment" | "science%26nature" | "sports%26leisure" | "history";
interface IPregunta {
  id: string;
  category: string;
  format: string;
  question: string;
  correctAnswers: string;
  incorrectAnswers: string[];
}

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent {
  puntajeService = inject(PuntajesService);

  juegoIniciado: boolean;
  categoriasSeleccionadas: boolean;
  preguntasObtenidas: IPregunta[];
  respuestasObtenidas: any[];
  fotosObtenidas: any[];
  fotosMostradas: any[];
  fotoSeleccionada: string | unknown;
  preguntaSeleccionada!: IPregunta;
  respuestaCorrecta: boolean;
  preguntasMostradas: IPregunta[];
  mensaje: string;
  puntaje: number;

  constructor() 
  { 
    this.juegoIniciado = false;
    this.categoriasSeleccionadas = false;
    this.preguntasObtenidas = [];
    this.respuestasObtenidas = [];
    this.preguntasMostradas = [];
    this.fotosObtenidas = [];
    this.fotosMostradas = [];
    this.fotoSeleccionada = "";
    this.respuestaCorrecta = false;
    this.mensaje = "Bienvenido a Preguntados! Las reglas son sencillas: Deberás seleccionar una categoría de preguntas. Una vez seleccionada, se te presentarán 10 preguntas acerca del tópico que escogiste junto con 4 posibles respuestas para cada una. Buena suerte!";
    this.puntaje = 0;
  }

  async IniciarJuego(categoria: Categoria): Promise<void>
  {
    this.preguntasMostradas.length = 0;
    this.preguntasObtenidas.length = 0;
    await this.ObtenerPreguntas(categoria);
    await this.ObtenerImagenes(categoria);
    this.AsignarPregunta();
    this.juegoIniciado = true;
  }

  FinalizarJuego(): void
  {
    this.puntajeService.GuardarPuntaje(this.puntaje, "Preguntados");
    this.juegoIniciado = false;
    this.preguntasMostradas.length = 0;
    this.preguntasObtenidas.length = 0;
    this.mensaje = `El juego finalizó! Su puntaje es: ${this.puntaje} puntos.`;
    this.puntaje = 0;
  }

  async ObtenerPreguntas(categoria: Categoria): Promise<void>
  {
    this.preguntasObtenidas.length = 0;

    const opciones = { method: "GET", headers: { "Authorization": environment.preguntadosApiKey } }
    const req = await fetch(`https://api.quiz-contest.xyz/questions?limit=10&page=1&category=${categoria}&format=multiple`, opciones);
    const res = await req.json();
    this.preguntasObtenidas = res.questions;
  }

  async ObtenerImagenes(categoria: Categoria): Promise<void>
  {
    this.fotosObtenidas.length = 0;
    let categoriaParseada = "";
    if(categoria == "arts%26literature") {categoriaParseada = "Art and literature";}
    else if(categoria == "science%26nature") {categoriaParseada = "Science";}
    else if(categoria == "sports%26leisure") {categoriaParseada = "Sports";}
    else if(categoria == "entertainment") {categoriaParseada = "Movies"}
    else {categoriaParseada = categoria;}

    const opciones = { method: "GET", headers: { "Authorization": environment.pexelsApiKey } }
    const req = await fetch(`https://api.pexels.com/v1/search?query=${categoriaParseada}`, opciones);
    const res = await req.json();
    this.fotosObtenidas = res.photos;
  }

  AsignarPregunta(): void
  {
    if(this.preguntasMostradas.length < 10)
    {
      this.respuestasObtenidas.length = 0;
      this.preguntaSeleccionada = this.preguntasObtenidas[Math.floor(Math.random() * this.preguntasObtenidas.length)]; 
      while(!this.PreguntaSeEncuentraDisponible()) { this.preguntaSeleccionada = this.preguntasObtenidas[Math.floor(Math.random() * this.preguntasObtenidas.length)]; }
      this.respuestasObtenidas.push(this.preguntaSeleccionada.incorrectAnswers[0], this.preguntaSeleccionada.incorrectAnswers[1], this.preguntaSeleccionada.incorrectAnswers[2], this.preguntaSeleccionada.correctAnswers);
      this.MezclarArray(this.respuestasObtenidas);
      this.AsignarFoto();
      this.preguntasMostradas.push(this.preguntaSeleccionada);
    }
    else { this.FinalizarJuego(); }
  }

  AsignarFoto(): void
  {
    this.fotoSeleccionada = Object.values(this.fotosObtenidas[Math.floor(Math.random() * this.fotosObtenidas.length)].src)[0];
    while(!this.FotoSeEncuentraDisponible()) { this.fotoSeleccionada = Object.values(this.fotosObtenidas[Math.floor(Math.random() * this.fotosObtenidas.length)].src)[0] }
    this.fotosMostradas.push(this.fotoSeleccionada);
  }

  PreguntaSeEncuentraDisponible(): boolean
  {
    let preguntaDisponible: boolean = true;

    if(this.preguntasMostradas.length > 0)
    {
      for (const preguntaMostrada of this.preguntasMostradas) 
      {
        if(this.preguntaSeleccionada.id == preguntaMostrada.id) { preguntaDisponible = false; }  
      }

      return preguntaDisponible;
    }
    return preguntaDisponible;
  }

  FotoSeEncuentraDisponible(): boolean
  {
    let fotoDisponible: boolean = true;

    if(this.fotosMostradas.length > 0)
    {
      for (const fotoMostrada of this.fotosMostradas) 
      {
        if(this.fotoSeleccionada == Object.values(this.fotosObtenidas[Math.floor(Math.random() * this.fotosObtenidas.length)].src)[0]) { fotoDisponible = false; }  
      }

      return fotoDisponible;
    }
    return fotoDisponible;
  }

  MezclarArray(array: string[]): string[] 
  {
    for (let i = array.length - 1; i > 0; i--) 
    {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  VerificarPrediccion(prediccion: string)
  {
    if(prediccion == this.preguntaSeleccionada.correctAnswers) 
    { 
      this.respuestaCorrecta = true;
      setTimeout(() => {
        this.respuestaCorrecta = false;
        this.puntaje = this.puntaje + 5;
        this.AsignarPregunta();
      }, 2000);
    }
    else 
    {
      this.respuestaCorrecta = false;
      this.puntaje = this.puntaje - 5;
      this.AsignarPregunta();
    }
  }
}
