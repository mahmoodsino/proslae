import React from 'react'
import { useMediaQuery } from 'react-responsive';
import BottomArea from './bottom-area/BottomArea';
import MiddleArea from './middle-area/MiddleArea';
import TopArea from './top-area/TopArea';

const BaseComponent = () => {
    const isMobileOrTablet = useMediaQuery({ query: '(max-width: 775px)' });

  return (
    <header className="ltn__header-area ltn__header-3">
			<TopArea />
			{!isMobileOrTablet && <MiddleArea />}
			<BottomArea />
		</header>
  )
}

export default BaseComponent
