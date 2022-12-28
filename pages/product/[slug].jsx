/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  const addToCart = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('sorry, product out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

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
            <button className=" primary-button w-full" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObject(product) : null,
    },
  };
}
