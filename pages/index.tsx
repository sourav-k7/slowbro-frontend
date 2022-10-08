import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <div>
      <div className='w-1/4 m-auto pt-32'>
        <div className='text-primary text-3xl font-semibold text-center mb-5'>Login</div>
        <div className='text-body mb-1'>Email</div>
        <input className='input-field mb-3' />
        <div className='text-body mb-1'>Password</div>
        <input className='input-field mb-8' />
          <button className='btn-primary block mb-2'>Login</button>
          <button className='text-body text-center w-full mb-5'>Forgot your password?</button>
        <div className='text-body text-center'>Don&apos;t have an account? <button className='text-seconday'>Sign up</button></div>
      </div>
    </div>
  )
}

export default Home
