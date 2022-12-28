/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/" className="flex ">
          <ChevronLeftIcon className="h-6 w-6" />
          Back to Products
        </Link>
      </div>
      <div className="grid grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <img
            src={product.img}
            alt={product.name}
            className="rounded-md h-[480px] w-[640px]"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-bold"> {product.name} </h1>
            </li>
            <li>Rp.{product.price}</li>
            <li className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 fill-yellow-300 text-transparent" />
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.desc}</li>
          </ul>
        </div>

        <div>
          <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
            <div className="mb-2 flex justify-between">
              <p className="font-bold">Harga</p>
              <div>Rp.{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="font-bold">Status</p>
              <div> {product.countInStock > 0 ? 'Tersedia' : 'Habis '} </div>
            </div>
            <button className=" primary-button w-full">Add to cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
