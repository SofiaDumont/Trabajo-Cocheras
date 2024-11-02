import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cocheras';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicies/auth.service';
import Swal from 'sweetalert2';
import { EstacionamientosService } from '../../../../cocheras-front/src/app/service/estacionamiento.service';
import { CocherasService } from '../../servicies/cocheras.service';


@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrls: ['./estado-cocheras.component.scss']
})
export class EstadoCocherasComponent implements OnInit {

  titulo: string = 'Estado de la cochera';
  header = { nro: 'N°', deshabilitada: 'DISPONIBILIDAD', ingreso: 'INGRESO', acciones: 'ACCIONES' };
  filas: Cochera[] = [];
  siguienteNumero: number = 1;

  auth = inject(AuthService);
  estacionamientos = inject(EstacionamientosService);
  cocheras = inject(CocherasService);

  ngOnInit() {
    this.traerCocheras().then(cocheras => {
      this.filas = cocheras;
    });
  }

  traerCocheras() {
    return fetch("http://localhost:4000/cocheras", {
      method: "GET",
      headers: {
        authorization: "Bearer " + this.auth.getToken() 
      }
    }).then(r => r.json());
  }

  agregarFila() {
    Swal.fire({
      title: 'Ingrese la patente del vehículo',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingrese una patente válida';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const nuevaFila: Cochera = {
          id: this.siguienteNumero,
          descripcion: result.value, // Guardamos la patente en la descripción
          deshabilitada: false,
          eliminada: false,
          activo: null,
        };
        this.filas.push(nuevaFila);
        this.siguienteNumero += 1;
        
        Swal.fire('Fila agregada', 'La cochera ha sido registrada con éxito.', 'success');
      }
    });
  }
  
  eliminarFila(numeroFila: number, event: Event) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.filas.splice(numeroFila, 1);
        Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
      }
    });
  }

  cambiarDisponibilidadCochera(numeroFila: number, event: MouseEvent) {
    this.filas[numeroFila].deshabilitada = !this.filas[numeroFila].deshabilitada;
    Swal.fire({
      title: 'Disponibilidad actualizada',
      text: this.filas[numeroFila].deshabilitada ? 'Cochera marcada como disponible.' : 'Cochera marcada como no disponible.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }

  abrirModalNuevoEstacionamiento(idCochera: number) {
    console.log("Abriendo modal cochera", idCochera);
    Swal.fire({
      title: "Ingrese la patente del vehículo",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Ingrese una patente válida";
        }
        return;
      }
    }).then(res => {
      if (res.isConfirmed) {
        console.log("Tengo que estacionar la patente", res.value);
        this.estacionamientos.estacionarAuto(res.value, idCochera).then(() => {
          // Actualizar cocheras
        });
      }
    });
  }
}

