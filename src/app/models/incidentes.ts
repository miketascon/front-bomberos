export class Incidentes {

    public idBomberos?: string;
    public idUser: string;
    public guardiaTurno: string;
    public nombresGuardia: string;
    public apellidosGuardia: string;
    public reporte: string;
    public fecha: any;
    public hora: any;
    public tipoLlamada: string;
    public tipoIncidente: string;
    public direccion: string;
    public barrioComuna: string;
    public zona: string;
    // Información de quien reporta
    public institucionInforma?: string;
    public apellidos?: string;
    public nombres?: string;
    public cedula?: string;
    public ciudadExpedicion?: string;
    public celTel?: string;
    public otroMetodo?: string;
    // maquina
    public maquina: string;
    public tipo: string;
    // tiempos de actuacion
    public salida: string;
    public enSitio: string;
    public terminoLabor: string;
    public regreso: string;
     // tiempo total maniobra
    public respuesta: string;
    public retorno: string;
    public maniobra: string;
    public totalMinutos: string;
     // complementarios
    public descripcion: string;
    public procedimiento: string;
    public observaciones: string;
    public otrasEntidades: string;

}
