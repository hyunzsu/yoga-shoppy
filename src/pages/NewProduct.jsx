import React, { useState } from 'react';
import Button from '../components/ui/Button';

export default function NewProduct() {
  const [product, setProduct] = useState({}); // 제품 정보 관리 -> 사용자가 입력한 데이터
  const [file, setFile] = useState(); // 파일 상태 관리 -> 파일은 따로 관리해야 함

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return; // 바로 return해서 setProduct 호출되지 않게
    }
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  console.log(product);
  const handleSubmit = (e) => {
    e.preventDefault();
    // 제품의 사진을 Cloudinary에 업로드하고 url 획득
    // Firebase에 새로운 제품을 추가함
  };

  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt='local file' />}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button text={'제품 등록하기'} />
      </form>
    </section>
  );
}
