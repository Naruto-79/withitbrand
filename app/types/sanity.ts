export interface SanityImage {
    _id: string; 
  _type: string;
  asset: {
    _ref: string;
    _type: string;
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
