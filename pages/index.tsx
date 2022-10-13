import {useEffect, useState} from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getProfile, loginRequest } from '../redux/user';
import { useAppDispatch } from '../hooks/redux_hooks';
import Loader from '../components/layout/loader';


const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [loading,setLoading] = useState(true);
  
useEffect(()=>{
  if(localStorage.getItem('slowbro-token')!=null){
    dispatch<any>(getProfile());
    router.replace('/home');
   }
   else{
     setLoading(false);
   }
},[dispatch,router])


async function onLogin() {
    try {
      //todo: replace any type
      await dispatch<any>(loginRequest({email,password}));
      if(localStorage.getItem('slowbro-token')!=null){
        router.replace('/home');
      }
    } catch (error) {
      console.log(error);
    }
    router.push('/home');
  }

  if(loading){
    return <div></div>;
  }

  return (
    <div >
      <div className='w-1/4 m-auto pt-32'>
        <div className='text-primary text-3xl font-semibold text-center mb-5'>Login</div>
        <div className='text-body mb-1'>Email</div>
        <input className='input-field mb-3 w-full' onChange={(element)=>setEmail(element.target.value)} />
        <div className='text-body mb-1'>Password</div>
        <input className='input-field mb-8 w-full' onChange={(element)=>setPassword(element.target.value)} />
          <button className='btn-primary block mb-2 w-full' onClick={onLogin}>Login</button>
          <button className='text-body text-center w-full mb-5'>Forgot your password?</button>
        <div className='text-body text-center'>Don&apos;t have an account? <button className='text-seconday' onClick={()=>router.push('/registration')} >Sign up</button></div>
      </div>
    </div>
  )
}

export default Home
