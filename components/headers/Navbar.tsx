import Link from 'next/link'
import React from 'react'
import { Tag } from 'tabler-icons-react';

interface Props{
    isSticky?:boolean
}

const Navbar = ({ isSticky }:Props) => {
  return (
    <nav>
    <div className="ltn__main-menu">
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/products">Products</Link>
            </li>
            <li>
                <Link className="promo-link" href="/promotions">
                    <img src="img/sale-bg.gif" alt="" />
                    <span>
                        <Tag /> Promotions
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            {!isSticky && (
                <>
                    <li>
                        <Link href="/terms-conditions">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                </>
            )}
        </ul>
    </div>
</nav>
  )
}

export default Navbar
