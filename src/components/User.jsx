import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className='flex items-center shrink-0'>
      <img
        className='w-10 h-10 rounded-full mr-2'
        src={photoURL}
        alt={displayName}
      />
      {/* 항상 숨어있어(hidden) 하지만 미디움사이즈부터는 block로 나타나도 돼 */}
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
