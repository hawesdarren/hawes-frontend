"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import Script from "next/script";


export default function HamburgerMenu() {
  return (
    
    <div id="hamburgerMenu">
        <div onClick={menuClick} >
            <Image
                src="/hamburger.svg"
                alt="menu"
                width={30}
                height={30}
                priority />  
        </div>
        <div    id="hamburgerMenuItems" 
                className="grid row-start-1 col-start-1 justify-items-start text-stone-200 bg-stone-900 m-2 min-w-[200px] max-w[300px] 
                gap-2 shadow-lg shadow-[rgb(200,128,49)] invisible"
                onClick={menuClick}>
            <div className="hamburgerMenuItem ">
                 <Link href='/'>Home</Link>
            </div>
            <div>
                <Link href='/register'>Register</Link>
            </div>
            <div>
                <Link href='/test'>Test</Link>
            </div>
            <div>
                menu item 4
            </div>
        </div>
    </div>
    )
};

function menuClick() {
    var currentState = document.getElementById('hamburgerMenuItems')
    if(currentState?.checkVisibility({visibilityProperty: true}) === true) {
        currentState?.classList.remove('visible')
        currentState?.classList.add('invisible')
        
    }
    else {
        currentState?.classList.remove('invisible')
        currentState?.classList.add('visible')
    }

  }
