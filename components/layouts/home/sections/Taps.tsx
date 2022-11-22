import React from 'react'
const tabs = ['Categories', 'Brands'];


interface Props {
    currentIndex:number
    setIndex:(index:number) => void
}

const Taps = ({currentIndex,setIndex}:Props) => {
    const handleTab = (index:number) => {
		setIndex(index);
	};
  return (
    <ul className="tabs">
			{tabs.map((tab, index) => {
				return (
					<li
						key={index}
						className={index + 1 === currentIndex ? 'tab selected_tab' : 'tab'}
						onClick={() => handleTab(index + 1)}
					>
						{tab}
					</li>
				);
			})}
		</ul>
  )
}

export default Taps
