import React from 'react'
import { useRecoilState } from 'recoil';
import { formatFloatNumber } from '../../helpers/Common';
import OrderDetailsAtom from '../../helpers/recoil/order/OrderDetailsAtom';
import FetchedItemsType from '../../helpers/types/FetchedItemsType';

function Header() {
	return (
		<thead>
			<tr>
				<th></th>
				<th className="">Product</th>
				<th className="center_">Price</th>
				<th className="center_">Quantity</th>
				<th className="center_">Total Price</th>
			</tr>
		</thead>
	);
}

interface Props {

}

interface Props {
    Products : FetchedItemsType
}

function Row({Products}:Props) {

	return (
		<tr>
			<td className="cart-product-image">
				<img src={Products?.product?.image?.path} alt="#" />
			</td>
			<td>
				<p className="truncate">{Products.variation?.name}</p>
			</td>
			<td>
				<p className="center_">${Products.variation?.price}</p>
			</td>
			<td>
				<p className="center_">{Products.quantity}</p>
			</td>
			<td>
				<p className="center_">
				{
              Products?.variation?.price &&
            formatFloatNumber(Products.quantity * Products?.variation?.price )
            }					</p>
			</td>
		</tr>
	);
}

const ProductsOrder = () => {
    const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
    const data = orderDetails.items.map((product, index) => {
		return <Row key={index} Products={product} />;
	});
  return (
    <div>
      <div className="table-responsive">
			<table className="table">
				<Header />
				<tbody>{data}</tbody>
			</table>
		</div>
    </div>
  )
}

export default ProductsOrder
