import Image from "next/image";
import Link from 'next/link';
import From from 'next/form';
import Header from '../components/header'

export default function Register() {
  return (
  <div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">

  <div className="flex order-1 justify-self-start z-50">
    <Header></Header>
  </div>
  <div className="flex order-2  flex flex-col justify-self-center p-3 w-fit min-w-[200px] max-w-[500px]">
        <h1>Register</h1>
        <form className="flex flex-col gap-2">
            <label htmlFor='email'>Enter your email:</label>
            <input type='email' name='email' id='email' className='border-1 border-black'/>
            <label htmlFor='password'>Enter your password:</label>
            <input name='password' id='password'/>
            <label htmlFor='reenteredPassword'>Re-enter your password:</label>
            <input name='re-enter password' id='reenteredPassword'/>
            <button type='button' id='btnRegister'>Register</button>
            <Link href='/' className="flex justify-center">Cancel</Link>
        </form>
        
  </div>
  <div className="flex order-3 items-end p-3">
    Footer    
        
  </div>
   
    </div>
    
    )
    
};