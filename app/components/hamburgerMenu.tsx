"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from 'next/link';
import DarkMode from "./darkModeSelector";

export default function HamburgerMenu() {

    const menuItems = [

        { name: 'Register', href: '/register' },
        { name: 'Accordion', href: '/public/accordion' },
        { name: 'Broken links', href: '/public/broken-links' },
        { name: 'Radio buttons', href: '/public/radio-buttons' },
        { name: 'Checkboxes', href: '/public/checkbox' },
        { name: 'Calendar', href: '/public/calendar' },
        { name: 'Tables', href: '/public/tables' },
        { name: 'Collapsible', href: '/public/collapsible' }
    ];

    const sortAlphabetically = (a: { name: string; }, b: { name: string; }) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    menuItems.sort(sortAlphabetically);

    const permanentMenuItems = [
        { name: 'Home', href: '/' },
        { name: '------------', href: '' },
    ]
    
    const finalMenuItems = permanentMenuItems.concat(menuItems);
    const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu container
    const menuItemsRef = useRef<HTMLDivElement>(null); // Reference to the menu items


  function toggleMenu() {
    const menu = menuItemsRef.current;
    if (menu) {
        menu.classList.toggle("hidden");
    }
}

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        // Check if the click is outside the menuRef
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const menu = document.getElementById('hamburgerMenuItems');
            if (menu && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden'); // Close the menu

            }
        }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []);

  return (
    
    <div id="hamburgerMenu" data-testid="hamburgerMenu" ref={menuRef}>
        <div className="flex flex-row">
            <Image className="m-1 cursor-pointer"
                onClick={toggleMenu}
                src="/hamburger.svg"
                alt="menu"
                width={30}
                height={30}
                priority />  
            <DarkMode />
        </div>
        
        <div id="hamburgerMenuItems" 
             className="grid row-start-1 col-start-1 justify-items-start text-(--text-color) bg-(--sidebar) m-2 min-w-[200px] max-w[300px] 
            gap-2 shadow-(--shadow) hidden"
            onClick={toggleMenu}
            ref={menuItemsRef}>
            {finalMenuItems.map((item) => (
                <div key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                </div>
            ))}
        </div>
        
               
    </div>
    )
};