import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';
import { UserService } from '../../services/data/user.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  formBuilder = inject(FormBuilder);
  fireStoreService = inject(FirebaseStoreService);
  userService = inject(UserService);
  encuestaForm!: FormGroup;
  respuestaGuardada: boolean;

  constructor() 
  {
    this.respuestaGuardada = false;
    this.encuestaForm = this.formBuilder.group({
      nombreApellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],

      seDivirtio: ['', Validators.required],
      juegoFavorito: ['', Validators.required], 
      opinion: ['', Validators.required], 
    });
  }

  GuardarRespuestas(): void
  {
    if (this.encuestaForm.valid) 
    {
      this.respuestaGuardada = true;
      const objetoRespuestasEncuesta = { usuario: this.userService.ObtenerNombreUsuario(), respuestas: this.encuestaForm.value };
      this.fireStoreService.GuardarContenido("RespuestasEncuestas", objetoRespuestasEncuesta);
    }
  }
}
