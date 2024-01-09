import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  product: { id, image, title, category, price }, // product 안에 낱개로 가져옴
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } }); // product의 정보도 같이 넘겨줘 (state 이용)
      }}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
    >
      <img src={image} alt={title} className='w-full' />
      <div className='mt-2 px-2 text-lg justify-between items-center'>
        <h3>{title}</h3>
        <p>{`${price}원`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  );
}
