import { NextResponse } from 'next/server';
import { sanityClient } from "@/app/lib/sanity";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    
    // Basic validation
    if (!orderData.billing_first_name || !orderData.cartItems) {
      return NextResponse.json({ 
        success: false, 
        message: "Missing required fields" 
      }, { status: 400 });
    }

    // Ensure we have the correct _type for Sanity
    const sanitizedOrder = {
      _type: 'order',
      ...orderData
    };

    // Create the order in Sanity
    const result = await sanityClient.create(sanitizedOrder);

    return NextResponse.json({ 
      success: true, 
      orderId: result._id,
      message: "Order created successfully" 
    });

  } catch (error: Error | unknown) {
    console.error('Order creation error:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ 
      success: false, 
      message: errorMessage 
    }, { status: 500 });
  }
}