import React from 'react'


const data = [
	{
		image: 'img/features/clock.svg',
		title: 'Fast Response',
		description: 'Lorem ipsum dolor sit amet.',
	},
	{
		image: 'img/features/cart.svg',
		title: 'Free delivery',
		description: 'Lorem ipsum dolor sit amet.',
	},
	{
		image: 'img/features/chat.svg',
		title: '24/7 Support',
		description: 'Lorem ipsum dolor sit amet.',
	},
	{
		image: 'img/features/wallet.svg',
		title: 'Trusted Payment',
		description: 'Lorem ipsum dolor sit amet.',
	},
];

interface Props {
    image:string,
    title:String,
    description:string
}

function Card({description,image,title}:Props) {
	return (
		<li>
				<img src={image} alt="" />
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
		</li>
	);
}


const Feature = () => {
  return (
    <div className="ltn__feature-area mt-35 mt--65---">
			<div className="container">
				<div className="row">
					<div className="features-box">
						<ul>
							{React.Children.toArray(
								data.map((item) => {
									return (
										<Card image={item.image} title={item.title} description={item.description} />
									);
								})
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Feature
