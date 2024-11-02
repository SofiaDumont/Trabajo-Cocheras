import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  constructor(private http: HttpClient) {}

  obtenerReportesMensuales(): Observable<{ numero: number; mes: string; usos: number; cobrado: number }[]> {
    return this.http.get<{ numero: number; mes: string; usos: number; cobrado: number }[]>('http://localhost:4000/reportes');
  }
}