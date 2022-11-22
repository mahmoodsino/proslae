import React from 'react'
import Navbar from '../../Navbar'

const BottomArea = () => {
  return (
    <div className="header-bottom-area d-none d-lg-block">
      <div className="container">
        <div className="row">
          <div className="col header-menu-column justify-content-center">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomArea
