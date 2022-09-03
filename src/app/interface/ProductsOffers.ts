export interface IProductsOffers {
    showProductsOffers: ShowProductsOffers;
}

export interface ShowProductsOffers {
    message:      string;
    status:       boolean;
    shopProducts: ShopProduct[];
}

export interface ShopProduct {
    id:         string;
    productId:  string;
    product:    Product;
    platformId: string;
    platform:   Platform;
    active:     boolean;
    price:      number;
    stock:      number;
}

export interface Platform {
    id:     string;
    name:   string;
    slug:   string;
    active: boolean;
}

export interface Product {
    id:               string;
    name:             string;
    slug:             string;
    released:         Date;
    img:              string;
    clip:             Clip;
    rating:           Rating;
    shortScreenshots: string[];
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
