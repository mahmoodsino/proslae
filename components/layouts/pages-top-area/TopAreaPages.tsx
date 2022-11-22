import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { CATEGORIES, SUB_CATEGORIES, BRAND } from '../../../helpers/Common';
const pages = [
	{
		to: '/cart',
		title: 'Shopping Cart',
	},
	{
		to: '/promotions',
		title: 'Promotions',
	},
];


interface Props {
    title?:string,
    isMini?:boolean
}

const TopAreaPages = ({isMini=true,title}:Props) => {
    const {pathname} = useRouter()

    

    const renderTitle = () => {
		return 
	};

    const renderSmallTitle = () => {
		for (let page of pages) {
			if (page.to === pathname) return false;
		}
		return true;
	};


    const renderImage = () => {
		return""
	};


  return (
    <div
			className={
				`ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-image ${!renderImage() && 'bg__'} ` +
				(isMini ? 'mini-header' : '')
			}
			style={{backgroundImage: renderImage(),}}
		>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2 justify-content-between">
							<div className="section-title-area ltn__section-title-2">
								<div className="ltn__breadcrumb-list">
									<ul>
										<li>
											<Link href="/">Home</Link>
										</li>
										<li>{renderSmallTitle() && title}</li>
									</ul>
								</div>
								<h1 className="section-title">{title}</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default TopAreaPages
