"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { SanityImage } from "../interface";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: SanityImage | null;
  price_id: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image?.asset?.url || '/path/to/default/image.jpg',
    price_id: price_id,
  };

  const handleAddToCart = () => {
    addItem(product);
    handleCartClick();
  };

  return (
    <Button onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
}
