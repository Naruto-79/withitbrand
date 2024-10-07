"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import CheckoutForm from "./CheckoutForm";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  async function handleCheckoutSubmit(orderData: any) {
    console.log(orderData);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      console.log("Order saved successfully");
      setCheckoutVisible(false);
      handleCartClick(); // Close the cart modal
    } catch (error) {
      console.error("Error saving order", error);
    }
  }

  const renderCartItems = () => {
    return Object.values(cartDetails ?? {}).map((entry) => (
      <li key={entry.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            src={entry.image as string}
            alt={entry.name}
            width={100}
            height={100}
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{entry.name}</h3>
            <p className="ml-4">৳{entry.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {entry.description}
          </p>

          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">QTY: {entry.quantity}</p>

            <div className="flex">
              <button
                type="button"
                onClick={() => handleRemoveItem(entry.id)}
                className="font-medium text-primary hover:text-primary/80"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    ));
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
      <SheetContent className="sm:max-w-lg w-[80vw] max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            {cartCount === 0 ? (
              <h1 className="py-6 text-center">
                You don&apos;t have any items
              </h1>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {renderCartItems()}
              </ul>
            )}
          </div>

          {cartCount !== undefined && cartCount > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p>৳{totalPrice}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes are calculated at checkout.
              </p>

              <div className="mt-6">
                <Button
                  onClick={() => setCheckoutVisible(true)}
                  className="w-full"
                >
                  Checkout
                </Button>
              </div>

              {isCheckoutVisible && (
                <CheckoutForm
                  onSubmit={handleCheckoutSubmit}
                  cartItems={Object.values(cartDetails ?? {})}
                  totalPrice={totalPrice ?? 0}
                />
              )}

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  OR{" "}
                  <button
                    onClick={handleCartClick}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}