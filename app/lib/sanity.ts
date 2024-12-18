import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: '0hr59n3g', // Your Sanity project ID
  dataset: 'production', // Your dataset name
  apiVersion: '2022-03-25', // Use the appropriate API version
  token: "skf3rdj57yvrcJx4wpVrMaT8M6xVhZ3m4D8kkjg14832zoeI1rTcUBNj2sc1HtMNglI7lrniVony64szoYhcYjILOCVxZegoXrm262xxXLcTAhN33iWYzynqmykx40xLH4ZtZc9AfRsw4PApP44fzVmDhSKNDKBxgAoWQUldw0g9FpUjydBW",
  useCdn: true, // Set to false for fresh data, true for cache
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: { asset?: { _ref: string } }) {
  if (!source || !source.asset) {
    console.error("Invalid image source:", source);
    return '/path/to/default/image.jpg'; // Use a default image URL
  }
  return builder.image(source.asset).url();
}

// Add a test function
export async function testSanityConnection() {
  try {
    const result = await sanityClient.fetch('*[_type == "order"][0]');
    console.log('Sanity connection test:', result ? 'Success' : 'No orders found');
    return true;
  } catch (error) {
    console.error('Sanity connection error:', error);
    return false;
  }
}
