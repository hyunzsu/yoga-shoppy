import React from 'react';

export default function ProductCard({
  product: { id, image, title, category, price },
}) {
  return (
    <li className='rounded-lg shadow-md overflow-hidden cursor-pointer'>
      <img src={image} alt={title} className='w-full' />
      <div className='mt-2 px-2 text-lg justify-between items-center'>
        <h3>{title}</h3>
        <p>{`${price}원`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  );
}
