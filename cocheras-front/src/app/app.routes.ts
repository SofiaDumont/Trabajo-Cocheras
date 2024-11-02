import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "estado-cocheras",
        component: EstadoCocherasComponent
    },
    {
        path: "reportes",
        component: ReporteComponent
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    }
];
