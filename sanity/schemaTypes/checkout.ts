import { Rule } from '@sanity/types';

export default {
  name: 'checkout',
  title: 'Checkout Form',
  type: 'document',
  fields: [
    {
      name: 'country',
      title: 'Country / Region',
      type: 'string',
      options: {
        list: [
          { title: 'Bangladesh', value: 'BD' },
          // Add more countries as needed
        ],
      },
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Full Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      options: {
        list: [
          { title: 'Dhaka', value: 'Dhaka' },
          { title: 'Chattogram', value: 'Chattogram' },
          { title: 'Khulna', value: 'Khulna' },
          // Add more cities here as per the front-end form
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().regex(/^\d{10,14}$/, 'Enter a valid phone number'),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(),
    },
    {
      name: 'orderNotes',
      title: 'Order Notes',
      type: 'text',
      description: 'Special notes for delivery (optional)',
    },
    {
      name: 'lastFourDigits',
      title: 'Last 4 Digits of Payment Number',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.max(4).min(4).regex(/^\d{4}$/, 'Must be 4 digits'),
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Bkash', value: 'Bkash' },
          { title: 'Nagad', value: 'Nagad' },
        ],
      },
    },
  ],
};
