import { NextResponse } from 'next/server';
import { client } from "@/app/lib/sanity";

export async function POST(req: Request) {
  console.log('API route hit with POST request');
  
  try {
    const orderData = await req.json();
    console.log('Received order data:', orderData);
    
    // Create the order in Sanity
    const order = await client.create({
      _type: 'order',
      ...orderData
    });

    console.log('Order created:', order);
    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, message: 'Error creating order' }, { status: 500 });
  }
}