"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  cartItems: CartItem[];
  totalPrice: number;
}

interface FormData {
  billing_first_name: string;
  billing_address_1: string;
  billing_state: string;
  billing_phone: string;
  billing_email: string;
  billing_notes?: string;
  billing_4digit_num: string;
  billing_pmethod: string;
}

const bangladeshDistricts = [
"Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon"
];

export default function CheckoutForm({
  cartItems,
  totalPrice,
}: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const { toast } = useToast();
  const router = useRouter();

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      cartItems: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice,
      paymentMethod,
      orderDate: new Date().toISOString(),
    };

    console.log('Submitting order data:', orderData);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Server response:', result);
  
      if (result.success) {
        toast({
          title: "Success",
          description: "Your order has been placed successfully!",
        });
        router.push("/order-confirmation");
      } else {
        throw new Error(result.message || 'Failed to submit order');
      }
  
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Error",
        description: "There was a problem placing your order. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-10xl mx-auto py-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Summary */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[400px]">
            {cartItems.map((item, index) => (
              <p key={index} className="text-sm">
                {item.name} - {item.quantity} x ৳{item.price}
              </p>
            ))}
            <p className="font-bold mt-4">Total: ৳{totalPrice}</p>
          </CardContent>
        </Card>

        {/* Billing & Shipping Details */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Billing &amp; Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 overflow-y-auto max-h-[400px]">
            {/* Billing Information */}
            <div className="space-y-2">
              <Label htmlFor="country">Country / Region</Label>
              <div className="font-bold">Bangladesh</div>
              <input
                type="hidden"
                name="billing_country"
                id="billing_country"
                value="BD"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_first_name">Full name</Label>
              <Input
                id="billing_first_name"
                name="billing_first_name"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_address_1">Full Address</Label>
              <Input
                id="billing_address_1"
                name="billing_address_1"
                placeholder="House number and street name"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_state">City</Label>
              <Select
                name="billing_state"
                required
                onValueChange={(value) =>
                  setFormData({ ...formData, billing_state: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {bangladeshDistricts.map((district, index) => (
                    <SelectItem key={index} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_phone">Phone</Label>
              <Input
                type="tel"
                id="billing_phone"
                name="billing_phone"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_email">Email address</Label>
              <Input
                type="email"
                id="billing_email"
                name="billing_email"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_notes">Order Notes</Label>
              <Textarea
                id="billing_notes"
                name="billing_notes"
                placeholder="Notes about your order, e.g. special notes for delivery."
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                Provide the last 4 digits of your payment number and place the order.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_4digit_num">
                Last 4 Digit of your payment number
              </Label>
              <Input id="billing_4digit_num" name="billing_4digit_num" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing_pmethod">Payment By</Label>
              <Select name="billing_pmethod">
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bkash">Bkash</SelectItem>
                  <SelectItem value="Nagad">Nagad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card className="w-full md:col-span-2">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Online Payment</Label>
                </div>
              </div>
            </RadioGroup>
            {paymentMethod === "cod" && (
              <p className="mt-2 text-sm">
                Confirm your order by providing the delivery charge via Bkash/Nagad.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" name="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I have read and agree to the website{" "}
                <a
                  href="https://withitbrand.com/exchange-return-refund/"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>
              </Label>
            </div>
            <Button type="submit">Place Order</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}