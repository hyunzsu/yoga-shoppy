import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateToCart } from '../api/firebase';

export default function ProductDetail() {
  const {
    user: { uid },
  } = useAuthContext(); // 사용자 id를 낱개로 가져옴
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation(); // useLocation을 통해 받아옴
  const [selected, setSelected] = useState(options && options[0]); // 기본적으로 첫번째 옵션이 선택되어 있음

  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // 여기서 장바구니에 추가하면 됨!
    // 사용자 id와 제품에 대한 정보 필요, 후에 파이어베이스 함수 호출
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };

  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img src={image} alt={title} className='w-full px-4 basis-7/12' />
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>
            {price}원
          </p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label htmlFor='select' className='text-brand font-bold'>
              옵션:
            </label>
            <select
              id='select'
              onChange={handleSelect}
              value={selected}
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
