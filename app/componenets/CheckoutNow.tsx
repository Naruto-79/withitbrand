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
    // Store the product details in localStorage or a global state management solution
    localStorage.setItem('checkoutProduct', JSON.stringify({
      name,
      description,
      price,
      currency,
      image: urlFor(image).url(),
      price_id,
    }));
    
    // Navigate to the checkout form page
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