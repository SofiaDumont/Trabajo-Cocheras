import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Estacionamiento } from '../../../cocheras-front/src/app/interfaces/estacionamiento';
@Injectable({
  providedIn: 'root'
})
export class EstacionaminetoService {
  auth = inject(AuthService)

  constructor() { }

  estacionarAuto(patenteAuto: string, idCochera:number) {
    return fetch('http://localhost:4000/estacionamientos/abrir',{
      method: 'POST',
      headers: {
        Authorization: "Bearer" + (this.auth.getToken()??''),
        "content-type":"aplication/json"
      },
      body: JSON.stringify({
        patente: patenteAuto,
        idCochera: idCochera,
        idUsuarioIngreso: "admin"
      })
    }).then(r=> r.json());
  }
}
