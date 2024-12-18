export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "billing_first_name",
      title: "First Name",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "billing_address_1",
      title: "Address",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "billing_state",
      title: "City",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "billing_phone",
      title: "Phone",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "billing_email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: "billing_notes",
      title: "Notes",
      type: "text"
    },
    {
      name: "billing_4digit_num",
      title: "Payment Last 4 Digits",
      type: "string"
    },
    {
      name: "billing_pmethod",
      title: "Payment By",
      type: "string",
      options: {
        list: [
          { title: "Bkash", value: "Bkash" },
          { title: "Nagad", value: "Nagad" }
        ]
      }
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cod" },
          { title: "Online Payment", value: "online" }
        ]
      }
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Product Name" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" }
        ]
      },
      initialValue: "pending"
    }
  ]
};