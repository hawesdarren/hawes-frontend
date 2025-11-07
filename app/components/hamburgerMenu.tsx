"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
        { name: 'Collapsible', href: '/public/collapsible' },
        { name: 'Carousel', href: '/public/carousel' },
        { name: 'Combobox', href: '/public/combobox' },
        { name: 'Alerts', href: '/public/alerts' },
        { name: 'Spinner', href: '/public/spinner' }
        


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
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);


    function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex(prev => {
                const next = prev === null ? 0 : Math.min(prev + 1, finalMenuItems.length - 1);
                itemRefs.current[next]?.focus();
                return next;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex(prev => {
                const next = prev === null ? finalMenuItems.length - 1 : Math.max(prev - 1, 0);
                itemRefs.current[next]?.focus();
                return next;
            });
        }
    }

  function toggleMenu() {
    const menu = menuItemsRef.current;
    if (menu) {
        menu.classList.toggle("hidden");
        if(!menu.classList.contains("hidden")){
            // Focus the first menu item when opening
            setFocusedIndex(0);
            setTimeout(() => {
                itemRefs.current[0]?.focus();
            }, 0);
        }
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
    
    <div id="hamburgerMenu" data-testid="hamburgerMenu" ref={menuRef} className="col-start-1 col-end-2 place-items-start z-50">
        <div className="flex flex-row" >

                <Image className="m-1 cursor-pointer"
                    onClick={toggleMenu}
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                            toggleMenu();
                        }
                    }}
                    role="button"
                    src="/hamburger.svg"
                    alt="menu"
                    width={30}
                    height={30}
                    priority 
                    tabIndex={0}
                    />  

                <DarkMode />

        </div>
        
        <div id="hamburgerMenuItems" 
             className="grid row-start-1 col-start-1 justify-items-start text-(--text-color) bg-(--sidebar) m-2 min-w-[200px] max-w[300px] 
            gap-2 shadow-(--shadow) hidden"
            onClick={toggleMenu}
            onKeyDown={handleMenuKeyDown} 
            ref={menuItemsRef}
            tabIndex={-1}
            >
                
            {finalMenuItems.map((item, idx) => (
                <div key={item.name}
                     ref={el => {itemRefs.current[idx] = el}}
                     tabIndex={-1 }
                     onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                            // Select item
                            window.location.href = item.href;
                        }
                    }}
                     className="outline-bold"
                     >
                    <Link href={item.href}>{item.name}</Link>
                </div>
            ))}
        </div>
        
               
    </div>
    )
};