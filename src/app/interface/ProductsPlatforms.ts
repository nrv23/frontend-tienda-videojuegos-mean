import { ShopProduct } from "./ProductsOffers";

export interface IProductPlatforms {
    showProductsPlatforms: ShowProductsPlatforms;
}

export interface ShowProductsPlatforms {
    status:       boolean;
    message:      string;
    shopProducts: ShopProduct[];
    info:         Info;
}

export interface Info {
    page:       number;
    total:      number;
    itemsPage:  number;
    totalPages: number;
}


export interface Clip {
    clips:   Clips | null;
    video:   null | string;
    preview: null | string;
}

export interface Clips {
    low:    string;
    medium: string;
    full:   string;
}

export interface Rating {
    count: number;
    value: number;
}
