import Link from 'next/link';
import React from 'react';

export default function CheckoutBTN({ title, handleClick }) {
	return (
		<Link href="#" className="theme-btn-1 btn btn-effect-1 animated_green text-uppercase" onClick={handleClick}>
			{title}
		</Link>
	);
}
