import React, { useState } from 'react';

function Number({ item }:any) {
	return <h1>{item}</h1>;
}

function getCurrentTime(duration:any) {
	let seconds:any = Math.floor((duration / 1000) % 60);
	let minutes:any = Math.floor((duration / (1000 * 60)) % 60);
	let hours:any = Math.floor((duration / (1000 * 60 * 60)) % 24);
	let days:any = Math.floor(duration / (1000 * 60 * 60 * 24));

	hours = hours.toString().padStart(2, '0');
	minutes = minutes.toString().padStart(2, '0');
	seconds = seconds.toString().padStart(2, '0');
	days = days.toString().padStart(2, '0');

	return {
		hours,
		minutes,
		seconds,
		days,
	};
}

interface Props {
    startDate:any
    endDate:any
}

export default function Timer({ startDate, endDate }:Props) {
	const [state, setState] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	setTimeout(() => {
		const date = new Date();
		const diff = getCurrentTime(new Date(endDate).getTime() - date.getTime());
		setState({
			days: diff.days,
			hours: diff.hours,
			minutes: diff.minutes,
			seconds: diff.seconds,
		});
	}, 1000);

	return (
		<div className="timer_">
            <div className="promo-text">
				<img src="timer.gif"/>
                <span>HURRY UP, <span>LIMITED TIME</span> OFFER IS TICKING DOWN</span>
            </div>
			<div className="timer">
				<div className="child">           
                    <Number item={state.days} />
					<h6>Days</h6>
				</div>
                <Number item=":" />
				<div className="child">
                    <Number item={state.hours} />
					<h6>Hours</h6>
				</div>
                <Number item=":" />
				<div className="child">				
                    <Number item={state.minutes} />
					<h6>Minutes</h6>
				</div>
                <Number item=":" />
				<div className="child">				
                    <Number item={state.seconds} />
					<h6>Seconds</h6>
				</div>
			</div>
		</div>
	);
}
