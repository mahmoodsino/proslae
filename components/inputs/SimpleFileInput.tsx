import React from 'react'

interface Props {
    title:string
    handleChange:any
    name:string
}

const SimpleFileInput = ({ title, handleChange, name }:Props) => {
  return (
    <div className="file-input">
			<input type="file" id="file" accept="image/*" className="file" name={name} onChange={handleChange} />
			<label htmlFor="file">
				{title}
				<p className="file-name"></p>
			</label>
		</div>
  )
}

export default SimpleFileInput
