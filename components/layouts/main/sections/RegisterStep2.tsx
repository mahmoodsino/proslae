import React from 'react'
import SimpleFileInput from '../../../inputs/SimpleFileInput'


interface Props {
    handleChange:any
    userData:any
    renderErrorMessage:any
}

const RegisterStep2 = ({ handleChange, userData, renderErrorMessage }:Props) => {
  return (
    <div>
			{userData.description === null && renderErrorMessage('Description')}
			<textarea
				placeholder="Description"
				name="description"
				className="input1"
				onChange={handleChange}
			></textarea>
			{userData.attachment === null && renderErrorMessage('License')}
			<SimpleFileInput title="Upload your License" name="attachment" handleChange={handleChange} />
		</div>
  )
}

export default RegisterStep2
