export class User {
    id: number = 0;
    email: string = "";
    password: string = "";
    experience: number = 0;
    coins: number = 0;
    generatedmemes: number = 0;
    trofeos: string[] = [];
    logros: { ruta: string, nombre: string }[] = [];
    nivel: number = 0;
    fotoPerfil: string[] = [];
    fotoPerfilActual: string[] = [];
}
