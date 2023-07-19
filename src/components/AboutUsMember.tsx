import React from 'react'
import style from '@/styles/components/AboutUsMember.module.css';
import Image from 'next/image';

interface MemberProps {
  url: string;
  role: string;
  name: string;
}

export default function Member({url, role, name}: MemberProps) {
  return (
	<div className={style.member}>
		<div className={style.memberPic}>
		<Image
			src={url}
			width={0}
			height={0}
			style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: "50%", aspectRatio: "1/1"}}
			unoptimized={true}
			alt="About us background"
		/>
		</div>
		<div className={style.memberInfo}>
			<p className={`body-title ${style.memberText}`}>
				{role}
			</p>
			<p className={`hero-text ${style.memberText}`}>
				{name}
			</p>
		</div>
	</div>
)
}
