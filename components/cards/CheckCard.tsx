import React from 'react'
import { STORE, INDIVIDUAL, GUEST, LOGIN_COMPONENT } from '../../helpers/Common';


interface Props {
    title:any
}

const CheckCard = ({title}:Props) => {

    const handleClick = () => {
		// if (title === GUEST) {
		// 	dispatch({ type: registerUserTypeReducer.SET_TYPE, payload: GUEST });
		// 	push({
		// 		pathname: '/',
		// 	});
		// 	return;
		// }
		// dispatch({ type: registerUserTypeReducer.SET_COMPONENT_NUMBER, payload: LOGIN_COMPONENT });
		// if (title === STORE) {
		// 	dispatch({ type: registerUserTypeReducer.SET_TYPE, payload: STORE });
		// 	return;
		// }
		// dispatch({ type: registerUserTypeReducer.SET_TYPE, payload: INDIVIDUAL });
	};
    if (title === INDIVIDUAL) {
		return (
			<button className="btn1" onClick={handleClick}>
				<svg viewBox="0 0 460.8 460.8">
					<path d="m230.43 0c-65.829 0-119.64 53.812-119.64 119.64s53.812 119.64 119.64 119.64 119.64-53.812 119.64-119.64-53.812-119.64-119.64-119.64z" />
					<path d="m435.76 334.89c-3.135-7.837-7.314-15.151-12.016-21.943-24.033-35.527-61.126-59.037-102.92-64.784-5.224-0.522-10.971 0.522-15.151 3.657-21.943 16.196-48.065 24.555-75.233 24.555s-53.29-8.359-75.233-24.555c-4.18-3.135-9.927-4.702-15.151-3.657-41.796 5.747-79.412 29.257-102.92 64.784-4.702 6.792-8.882 14.629-12.016 21.943-1.567 3.135-1.045 6.792 0.522 9.927 4.18 7.314 9.404 14.629 14.106 20.898 7.314 9.927 15.151 18.808 24.033 27.167 7.314 7.314 15.673 14.106 24.033 20.898 41.273 30.825 90.906 47.02 142.11 47.02s100.83-16.196 142.11-47.02c8.359-6.269 16.718-13.584 24.033-20.898 8.359-8.359 16.718-17.241 24.033-27.167 5.224-6.792 9.927-13.584 14.106-20.898 2.611-3.135 3.133-6.793 1.566-9.927z" />
				</svg>

				<span>{INDIVIDUAL}</span>
			</button>
		);
	}

	if (title === STORE) {
		return (
			<button className="btn1" onClick={handleClick}>
				<svg viewBox="0 0 24 24">
					<path d="M16,13a5,5,0,0,1-8,0,4.956,4.956,0,0,1-7,.977V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V13.974A4.956,4.956,0,0,1,16,13Z" />
					<path d="M21.7,3.131A3.975,3.975,0,0,0,17.792,0H17V3a1,1,0,0,1-2,0V0H9V3A1,1,0,0,1,7,3V0H6.208A3.975,3.975,0,0,0,2.3,3.132L1.022,8.9,1,10.02A3,3,0,0,0,7,10a1,1,0,0,1,2,0,3,3,0,1,0,6,0,1,1,0,0,1,2,0,3,3,0,1,0,6,0V9.107Z" />
				</svg>
				<span>{STORE}</span>
			</button>
		);
	}

	if (title === GUEST) {
		return (
			<button className="btn1 justify-content-center" onClick={handleClick}>
				<span>{GUEST}</span>
			</button>
		);
	}
	return(
		<div></div>
	)
}

export default CheckCard
