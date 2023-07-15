import React, { ReactElement, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/semantics/Navbar.module.css';
import Button from '@/components/Button';

import { getProviders, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faUser, faShoppingCart, faSignOut} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { data: session } = useSession();
  const [accountButton, setAccountButton] = useState<ReactElement>(React.createElement(Button, {text: "Log in", url: "/login"}));
  const [cart, setCart] = useState<ReactElement>();

  React.createElement(Link, {href: "/cart"}, React.createElement(FontAwesomeIcon, {icon: faShoppingCart}))

  useEffect(() => {
    if (session) {
      setAccountButton(React.createElement(Link, {href: "/account"}, React.createElement(FontAwesomeIcon, {icon: faUser})));
      setCart(React.createElement(Link, {href: "/cart"}, React.createElement(FontAwesomeIcon, {icon: faShoppingCart})));
      
    }
  }, [session]);

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
              <p className={`logoText ${style.logoText}`}>The Chill Chamber</p>
            </Link>
          </div>
          <div className={style.right}>
            <ul className={style.navlinks}>
              <li className={style.nav_items}><Link href='/products'>PRODUCTS</Link></li>
              <li className={style.nav_items}><Link href='/about'>ABOUT US</Link></li>
              <li className={style.nav_items}><Link href='/contact'>CONTACT</Link></li>
              <li className={style.nav_items}>
                { cart }
              </li>
              <li className={style.nav_items}>
                { accountButton }
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  )
}

export function ProductNavbar({ onData }) {

  const { data: session } = useSession();
  const [accountButton, setAccountButton] = useState<ReactElement>(React.createElement(Button, {text: "Log in", url: "/login"}));

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const search = event.target.globalSearch.value;

    // alert(search);

    onData({search});
  }

  useEffect(() => {
    if (session) {
      setAccountButton(React.createElement(Link, {href: "/account"}, React.createElement(FontAwesomeIcon, {icon: faUser})))
      
    }
  }, [session]);

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
              <p className={`logoText ${style.logoText}`}>The Chill Chamber</p>

            </Link>
          </div>
          <div className={style.right}>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="globalSearch" id="gSearch" placeholder='Search Products' />
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <Link href="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <>
            { accountButton }
            </>
          </div>
        </nav>
      </div>
    </section>
  )
}

export function LoginNavbar() {
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
              <p className={`logoText ${style.logoText}`}>The Chill Chamber</p>
            </Link>
          </div>
        </nav>
      </div>
    </section>
  )
}

export function AccountNavbar() {
  
  return (
    <section id={style.navAccount}>
      <div className="container">
        <nav id={style.navbarAccount}>
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
              <p className={`logoText ${style.logoText}`}>The Chill Chamber</p>
            </Link>
          </div>
          <div className={style.right}>
            <ul className={style.navInfo}>
              <li className={style.nav_items}><Link href="/account"><FontAwesomeIcon icon={faUser} /></Link></li>
              <li className={style.nav_items}><Link href="/api/auth/signout"><FontAwesomeIcon icon={faSignOut} /></Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  )
}



export async function getServerSideProps(context: any) {
	const providersData = await getProviders();
 	const csrfTokenData = await getCsrfToken(context);
  const session = await getSession(context);


	return {
		props: {
			providersData: providersData,
			csrfTokenData: csrfTokenData,
      session: session
		}
	}
}