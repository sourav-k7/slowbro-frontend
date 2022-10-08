import { useRouter } from 'next/router'
import React from 'react'

export default function Registration() {
	const router = useRouter();
	return (
		<div>
			<div className='w-1/4 m-auto pt-32'>
				<div className='text-primary text-3xl font-semibold text-center mb-5'>Sign Up</div>
				<div className='text-body mb-1'>Name</div>
				<input className='input-field mb-3' />
				<div className='text-body mb-1'>Email</div>
				<input className='input-field mb-3' />
				<div className='text-body mb-1'>Password</div>
				<input className='input-field mb-8' />
				<button className='btn-primary block mb-3'>Sign Up</button>
				<div className='text-body text-center'>Already have an account? <button className='text-seconday' onClick={()=>router.push('/')}>Sign in</button></div>
			</div>
		</div>
	)
}
