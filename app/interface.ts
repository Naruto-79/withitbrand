export interface simplifiedProduct {    
    _id: string;
    imageUrl: string;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
}

export interface fullProduct {
    _id: string;
    images: SanityImage[];
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    description: string;
    price_id: string;
}

export interface SanityImage {
    _id: string;
    _type: string;
    asset: {
        _id: string;
        url: string;
    };
}
