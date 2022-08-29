export interface ICarouselItem {
    id: number | string;        // Identificador
    title: string;              // Título
    description: string;        // Descripción
    background: string;         // URL de la imagen del fondo
    url: string;                // URL destino cuando hagamos click
}