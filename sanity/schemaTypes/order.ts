export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "billing_first_name", title: "First Name", type: "string" },
    { name: "billing_address_1", title: "Address", type: "string" },
    { name: "billing_state", title: "City", type: "string" },
    { name: "billing_phone", title: "Phone", type: "string" },
    { name: "billing_email", title: "Email", type: "string" },
    { name: "billing_notes", title: "Notes", type: "text" },
    { name: "billing_4digit_num", title: "Payment Last 4 Digits", type: "string" },
    { name: "billing_pmethod", title: "Payment By", type: "string" },
    { name: "paymentMethod", title: "Payment Method", type: "string" },
    { name: "totalPrice", title: "Total Price", type: "number" },
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
      ]
    },
    { name: "orderDate", title: "Order Date", type: "datetime" },
  ],
};