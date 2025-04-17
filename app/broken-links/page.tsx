'use client'

import Image from "next/image";
import Link from 'next/link';
import From from 'next/form';
import Header from '../components/header'
//import BrokenImages from "../components/brokenImages";
import dynamic from 'next/dynamic';

const BrokenImages = dynamic(() => import('../components/brokenImages'), { ssr: false })

export default function Page() {
  
  return (
<div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">

<div className="flex order-1 justify-self-start z-50">
  <Header></Header>
</div>
<div className="flex order-2  flex flex-col justify-self-center p-3 w-fit min-w-[200px] max-w-[500px]">
      <p>The challange is to find all of the broken links and images in this page</p>

      <div>
        <BrokenImages></BrokenImages>
        
      </div>  

    
</div>

<div className="flex order-4 items-end p-3">
  Footer    
      
</div>
 
  </div>
  
  )
    
};


