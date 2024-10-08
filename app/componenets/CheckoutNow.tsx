"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const router = useRouter();

  function openCheckoutForm() {
    const imageUrl = image ? urlFor(image) : '/path/to/default/image.jpg';
    localStorage.setItem('checkoutProduct', JSON.stringify({
      name,
      description,
      price,
      currency,
      image: imageUrl,
      price_id,
    }));
    
    router.push('/checkout');
  }

  return (
    <Button
      variant="outline"
      onClick={openCheckoutForm}
    >
      Checkout Now
    </Button>
  );
}