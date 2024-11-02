import { Estacionamiento } from "../../../cocheras-front/src/app/interfaces/estacionamiento";

export interface Cochera{
    id: number, 
    descripcion: string,
    deshabilitada: boolean,
    eliminada: boolean,
    activo: Estacionamiento | null;
}
