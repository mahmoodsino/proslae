import React from 'react';

function BaseGreenBTN({ title, handleClick, type = 'button', className = '' }) {
	return (
		<div className="btn-wrapper mt-0">
			<button className="theme-btn-1 className btn btn-block my_btn" onClick={handleClick} type={type}>
				{title}
			</button>
		</div>
	);
}

export default BaseGreenBTN;
