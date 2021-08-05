export interface Tipo{
    tipo: number;
}

export interface CategoryResponse {
    message: string;
    cveCategory: number
    nombre: string;
    descripcion: string;
    tipo: number;
    cveRegistro: number;
}
