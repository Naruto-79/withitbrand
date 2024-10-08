export interface SanityImage {
    _id: string;
    _type: string;
    asset: {
        _id: string;
        url: string;
    };
}

export interface FullProduct {
  _id: string;
  images: SanityImage[];
  price: number;
  name: string;
  description: string;
  slug: string;
  categoryName: string;
  price_id: string;
}

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: SanityImage | null; // Allow null here
  price_id: string;
}
