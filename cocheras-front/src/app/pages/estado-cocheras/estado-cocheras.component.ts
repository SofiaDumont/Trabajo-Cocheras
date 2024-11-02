import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { Estacionamiento } from '../../interfaces/estacionamiento';
import { CocherasService } from '../../service/cocheras.service';
import { EstacionamientosService } from '../../service/estacionamiento.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule,HeaderComponent],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})

export class EstadoCocherasComponent {
  auth = inject(AuthService);
  cocheras = inject (CocherasService)
  estacionamiento = inject (EstacionamientosService)
  
  titulo: string = 'Estado de la cochera';

  header:{nro:string, disponibilidad: string, ingreso: string, acciones: string} = {
    nro: 'Nro',
    disponibilidad: 'Disponibilidad',
    ingreso: 'Ingreso',
    acciones:'Acciones',
  };
  filas: (Cochera & { activo: Estacionamiento|null })[] = [];

  siguienteNumero: number = 1;
  
  ngOnInit() {
    this.traerCocheras().then(cocheras => {
      this.filas=cocheras;
    });
  }
  traerCocheras(){
    return this.cocheras.cocheras();
  }
  
  agregarFila() {
    // TODO: implementar
  }

  /** Elimina la fila de la cochera seleccionada */
  eliminarFila(cocheraId: number) {
    // TODO: implementar
  }

  /** Cambia la disponibilidad de una cochera, si está habilitada se deshabilita y viceversa */
  cambiarDisponibilidadCochera(cocheraId: number) {
    // TODO: implementar
  }
}
