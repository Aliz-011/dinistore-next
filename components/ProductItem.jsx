/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="card pb-8">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.img}
          alt={product.name}
          className="rounded shadow object-cover hover:object-contain h-2/3 w-full"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">Rp.{product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
