export interface User {
    usuario: string,
    password:string
}

export interface UserResponse{
    message: string;
    token: string;
    idUsuario:string;
    usuario: string;
    idRol: number;
    rol: string;
}