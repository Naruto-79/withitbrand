import AddToBag from "@/app/componenets/AddToBag";
import CheckoutNow from "@/app/componenets/CheckoutNow";
import ImageGallery from "@/app/componenets/ImageGallery";
import { FullProduct, SanityImage,} from "@/app/types/sanity";
import { sanityClient } from "@/app/lib/sanity"; // Ensure this is the correct import
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    images[]{
      _id,
      _type,
      asset->{
        _id,
        url
      }
    },
    price,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    price_id
  }`;

  const data = await sanityClient.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: FullProduct = await getData(params.slug);

  // Get the first image or use null
  const firstImage: SanityImage | null = data.images && data.images.length > 0 ? data.images[0] : null;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />   
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                ৳{data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                ৳{data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="BDT"
                description={data.description}
                image={firstImage}
                name={data.name}
                price={data.price}
                price_id={data.price_id}
              />
              <CheckoutNow
                currency="BDT"
                description={data.description}
                image={firstImage}
                name={data.name}
                price={data.price}
                price_id={data.price_id}
              />
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
