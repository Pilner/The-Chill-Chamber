import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  url: string;
}

export default function button({text, url}: ButtonProps) {
  return (
    <div className={`button-div`}>
      <Link className={`round-button`} href={url}>{text}</Link>
    </div>
  )
}
