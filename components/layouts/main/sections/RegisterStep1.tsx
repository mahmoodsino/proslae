import Link from 'next/link'
import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterStep1 = () => {
  return (
    <div className="form-box register-box">
			<h4 className="mb-3 font-weight-bold">Register Your Account</h4>
			<RegisterForm />
			<div className="agree-box">
				By registering, you agree to WHOLE SALE HOUSE's{' '}
				<Link href="/terms-conditions">Terms and Condistions</Link> &{' '}
				<Link href="/privacy-policy">Privacy Policy</Link>
			</div>
		</div>
  )
}

export default RegisterStep1
