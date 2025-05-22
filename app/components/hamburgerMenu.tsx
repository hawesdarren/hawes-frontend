"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import Script from "next/script";


export default function HamburgerMenu() {
  return (
    
    <div id="hamburgerMenu">
        <div 
        onClick={menuClick}     
        >
            <Image
                src="/hamburger.svg"
                alt="menu"
                width={30}
                height={30}
                priority />  
        </div>
        <div    id="hamburgerMenuItems" 
                className="grid row-start-1 col-start-1 justify-items-start text-stone-200 bg-stone-900 m-2 min-w-[200px] max-w[300px] 
                gap-2 shadow-lg shadow-[rgb(200,128,49)] hidden"
                onClick={menuClick}>
            <div>
                 <Link href='/'>Home</Link>
            </div>
            <div>
                <Link href='/register'>Register</Link>
            </div>
            <div>
                <Link href='/public/accordion'>Accordion</Link>
            </div>
            <div>
                <Link href='/public/broken-links'>Broken links</Link>
            </div>
            <div>
                <Link href='/public/radio-buttons'>Radio buttons</Link>
            </div>
            <div>
                <Link href='/public/checkbox'>Checkboxes</Link>
            </div>
            <div>
                <Link href='/public/tables'>Todo</Link>
            </div>
            <div>
                <Link href='/public/tables'>Todo2</Link>
            </div>
        </div>
    </div>
    )
};

function menuClick() {
    
    var currentState = document.getElementById('hamburgerMenuItems')
    currentState?.classList.toggle('hidden')

  }
