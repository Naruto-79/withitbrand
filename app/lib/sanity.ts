import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '0hr59n3g', // Your Sanity project ID
  dataset: 'production', // Your dataset name
  apiVersion: '2022-03-25', // Use the appropriate API version
  token:"skBnewnG5T8hvreyci04bwqWpHCnVWyAESVMrnzTi8sFI0PXx3Y79XM2XpksOVecCFxcwNqCj5GEwoUXcZwq5BYiH0C8096cg0tZfxSp0nz3wAMSeoXbA7bt1uJGD0EzZCDepsBFDYNP2R4xrGa7XfmIJqEzxSLEkoLnM8K2KYzXyhKXBk9k",
  useCdn: true, // Set to false for fresh data, true for cache
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
