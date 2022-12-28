/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

const PlaceOrder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  console.log(cartItems);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 300000 ? 0 : 15000;
  const taxPrice = round2(itemsPrice * 0.1);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Order Page">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card h-fit p-5">
              <h2 className="mb-2 text-lg">Alamat tujuan</h2>
              <div>
                {shippingAddress.fullName},{shippingAddress.address},{' '}
                {shippingAddress.city},{shippingAddress.postalCode},{' '}
                {shippingAddress.country},
              </div>
              <div>
                <Link
                  href="/shipping"
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="card h-fit p-5">
              <h2 className="mb-2 text-lg">Metode Pembayaran</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment" className="text-blue-500 hover:underline">
                  Edit
                </Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-24 h-24"
                          />
                          &nbsp;{item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">Rp.{item.price}</td>
                      <td className="p-5 text-right">
                        Rp.{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart" className="text-blue-500 hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="card p-5 h-fit">
            <h2 className="mb-2 text-lg">Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <h1>Items</h1>
                  <span>Rp.{itemsPrice}</span>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <h1>Tax (10%)</h1>
                  <span>Rp.{taxPrice}</span>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <h1>Biaya pengiriman</h1>
                  <span>Rp.{shippingPrice}</span>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <h1>Total</h1>
                  <span>Rp.{totalPrice}</span>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={handleOrder}
                  className="primary-button w-full"
                >
                  {loading ? 'Loading...' : 'Bayar'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

PlaceOrder.auth = true;

export default PlaceOrder;
