import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Shipping = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [state, dispatch] = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="shipping address">
      <CheckoutWizard activeStep={1} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto max-w-screen-md"
      >
        <h1 className="mb-4 text-xl">Alamat pengiriman</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Nama lengkap</label>
          <input
            type="text"
            id="fullName"
            autoFocus
            className="w-full border rounded-md px-3 py-2 active:bg-indigo-200"
            {...register('fullName', {
              required: 'please enter full name',
            })}
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Alamat</label>
          <input
            type="text"
            id="address"
            autoFocus
            className="w-full border rounded-md px-2 py-2 active:bg-indigo-200"
            {...register('address', {
              required: 'please enter address',
              minLength: {
                value: 10,
                message: 'we think your address us invalid',
              },
            })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Kota</label>
          <input
            type="text"
            id="city"
            autoFocus
            className="w-full border rounded-md px-2 py-2 active:bg-indigo-200"
            {...register('city', {
              required: 'please enter city',
            })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Kode Pos</label>
          <input
            type="text"
            id="postalCode"
            autoFocus
            className="w-full border rounded-md px-2 py-2 active:bg-indigo-200"
            {...register('postalCode', {
              required: 'please enter postalCode',
            })}
          />
          {errors.postalCode && (
            <span className="text-red-500">{errors.postalCode.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Negara</label>
          <input
            type="text"
            id="country"
            autoFocus
            className="w-full border rounded-md px-2 py-2 active:bg-indigo-200"
            {...register('country', {
              required: 'please enter country',
            })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

export default Shipping;

Shipping.auth = true;
