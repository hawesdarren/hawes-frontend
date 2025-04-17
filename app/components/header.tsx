'use client'

import Image from "next/image";
import Link from 'next/link';
import HamburgerMenu from "./hamburgerMenu";
import { usePathname } from 'next/navigation'

export default function Header() {
  
  return (
 
  <div className="grid auto-cols-[minmax(0,60px)_1fr_minmax(0,60px)] gap-4 w-dvw max-w-200">
    <div className="col-start-1 col-end-2 place-items-start ">
    <HamburgerMenu />  
      
    </div>
    <div className="col-start-2 place-items-center overflow-clip mt-5">
        <h1>{pageTitle()}</h1>

    </div>
    <div className="col-start-3 justify-self-end">
        <Link href="/">
            
            <Image
                className="dark:invert"
                src="/hawesLogo.svg"
                alt="Hawes logo"
                width={100}
                height={100}
                priority />
        
        </Link>
    </div>
   
  </div>

    )
};

function pageTitle(){
  const pathname = usePathname()
  var regexp = /[\w\-]+$/
  var pageTitle = regexp.exec(pathname)?.toString()
  if(pageTitle === null || pageTitle === ''){
    pageTitle = 'Home'
  }
  else{
    //Convert 1st letter to uppercase and convert - to space
    pageTitle = pageTitle!.replaceAll('-', ' ')
    pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)

  }
  
  return pageTitle
}
