import { useRouter } from 'next/router'
import React,{useState} from 'react'
import { useAppDispatch } from '../hooks/redux_hooks';
import { registrationRequest } from '../redux/user/userServices';

export default function Registration() {
	const [name,setName] =useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const router = useRouter();
	const dispatch = useAppDispatch();

 async function	onSignUp(){
		try {
			await dispatch<any>(registrationRequest({name,email,password}));
			if(localStorage.getItem('slowbro-token')!=null){
				router.replace('/home');
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<div className='w-1/4 m-auto pt-32'>
				<div className='text-primary text-3xl font-semibold text-center mb-5'>Sign Up</div>
				<div className='text-body mb-1'>Name</div>
				<input className='input-field mb-3 w-full' onChange={(ele)=>setName(ele.target.value)} />
				<div className='text-body mb-1'>Email</div>
				<input className='input-field mb-3 w-full' onChange={(ele)=>setEmail(ele.target.value)} />
				<div className='text-body mb-1'>Password</div>
				<input type='password' className='input-field mb-8 w-full' onChange={(ele)=>setPassword(ele.target.value)}  />
				<button className='btn-primary block mb-3 w-full' onClick={onSignUp}>Sign Up</button>
				<div className='text-body text-center'>Already have an account? <button className='text-seconday' onClick={()=>router.push('/')}>Sign in</button></div>
			</div>
		</div>
	)
}
