import React from 'react';

function SimpleBTN({ title, handleClick, type = 'button', btnStyle = 'btn-regular', className = '' }) {
	return (
		<button className={`btn1 ${btnStyle} ${className}`} onClick={handleClick} type={type}>
			{title}
		</button>
	);
}

export default SimpleBTN;
