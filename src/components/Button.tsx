import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  url: string;
}

export default function Button({text, url}: ButtonProps) {
  return (
    <div className={`button-div`}>
      <Link href={url}>
        <button className={`round-button`}>{text}</button>
      </Link>
    </div>
  )
}

export function APIButton({text, onData}: ButtonProps) {
  
  const handleClick = () => {
    onData();
  }

  // onData(true);

  return (
    <div className={`button-div`}>
      <button className={`round-button`} onClick={handleClick}>{text}</button>
    </div>
  )
}
