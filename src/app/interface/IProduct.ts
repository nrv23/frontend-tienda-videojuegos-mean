export interface IProduct {
    id: string;                 //Identificador del product de la tienda
    slug?: string;              //Slug del product0
    name: string;               // Nombre
    img: string;                // Imagen del producto
    stock: number;              // Cantidad de unidades en el stock
    discount?: number;          // Porcentaje de descuento que se aplicará
    price: number;              // Precio real
    priceDiscount?: number;     // Nuevo precio con descuento, si discount tiene valor
    description: string;        // Descripción del producto
    qty?: number;               // Cantidad de unidades que se van a adquirir
    rating?: IRatingItem;       // Información sobre las reseñas
}