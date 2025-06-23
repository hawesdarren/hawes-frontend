'use client'

import Image from "next/image";
import Link from 'next/link';
import From from 'next/form';
import Header from '../../components/header'
import dynamic from 'next/dynamic';

const BrokenImages = dynamic(() => import('../../components/brokenImages'), { ssr: false })

export default function Page() {
  
  return (

<div className="grid p-6 gap-3">
      <div>
        <p>The challenge is to find all of the broken links and images in this page</p>
      </div>
      <div>
        <h2>Images</h2>
        <BrokenImages></BrokenImages>
        
      </div>
      <div>
        <h2>Todo - downloads</h2>
      </div>
      <div>
        <h2>Todo - internal and external links</h2>
        <Link href="/public/checkbox">Checkbox</Link>
      </div>

    
</div>



  
  )
    
};


