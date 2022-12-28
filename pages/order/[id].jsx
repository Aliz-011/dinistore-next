/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      state;
  }
}

const Order = () => {
  const { query } = useRouter();
  const orderId = query.id;

  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
  console.log(totalPrice);

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <div className="my-3 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h1 className="mb-4 text-lg">Alamat pengiriman</h1>
              <div>
                {shippingAddress.fullName},{shippingAddress.address},{' '}
                {shippingAddress.city},{shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="my-3 rounded-lg bg-green-100 p-3 text-green-700">
                  Sampai pada {deliveredAt}
                </div>
              ) : (
                <div className="my-3 rounded-lg bg-red-100 p-3 text-red-700">
                  Tidak terkirim
                </div>
              )}
            </div>

            <div className="card p-5">
              <h1 className="mb-4 text-lg">Metode Pembayaran</h1>
              <span>{paymentMethod}</span>
              {isPaid ? (
                <div className="my-3 rounded-lg bg-green-100 p-3 text-green-700">
                  Telah dibayar
                </div>
              ) : (
                <div className="my-3 rounded-lg bg-red-100 p-3 text-red-700">
                  Belum dibayar
                </div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h1 className="mb-4 text-lg">Items</h1>
              <table>
                <thead>
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-20 h-20"
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
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h1 className="text-lg mb-2">Order summary</h1>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <h1>Items</h1>
                    <span>Rp.{itemsPrice}</span>
                  </div>
                </li>{' '}
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
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

Order.auth = true;

export default Order;
