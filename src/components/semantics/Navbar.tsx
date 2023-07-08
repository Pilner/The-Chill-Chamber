import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/semantics/Navbar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <section id={style.nav}>
      <div className="container">
        <nav id={style.navbar}>
          <div className={style.left}>
            <Link href={"/"}>
              <Image
                src="/logotcc.png"
                width={0}
                height={0}
                style={{height: "85%", width: "100%", objectFit: "contain"}}
                unoptimized={true}
                alt="Logo"
              />
            </Link>
            <ul className={style.navlinks}>
              <li className={style.nav_items}><Link href='/products'>PRODUCTS</Link></li>
              <li className={style.nav_items}><Link href='/about'>ABOUT US</Link></li>
              <li className={style.nav_items}><Link href='/contact'>CONTACT</Link></li>
            </ul>
          </div>
          <div className={style.right}>
            <form method="POST">
              <input type="text" name="globalSearch" id="gSearch"/>
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <Link href="#">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </nav>
      </div>
    </section>
  )
}
