"use client";


import Link from 'next/link';
import { Collapsible , CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible"
import Image from "next/image";
import { useState } from 'react';

const hamburgerLinks  = [
    { page: "Accordion & tabs", path: "/public/accordion" },
    { page: "Broken images & links", path: "/public/broken-links" },
    { page: "Checkboxes", path: "/public/checkbox" },
    { page: "Radio buttons", path: "/public/radio-buttons" },
    { page: "Tables", path: "/public/tables" },
]

// Sort the array by page name
const sortedLinks = hamburgerLinks.sort((a, b) => a.page.localeCompare(b.page))

// Create a list of links
function createLinks(links: { page: string, path: string }[]) { 
    return links.map((link) => (
        <div key={link.page} className="p-1">
            <div className="grid col-start-1 col-span-3">
                <Link href={link.path}>
                    {link.page}
                </Link>
            </div>
        </div>
    ))
}

function HamburgerLinks() {
  
    
    hamburgerLinks.sort((a,b )=> a.page.localeCompare(b.page))

    return (
    <div>
        <Link href='/'>Home</Link>
        {createLinks(sortedLinks)}
    </div>
)}


export default function HamburgerMenuTwo() {
const [isOpen, setIsOpen] = useState(false);

const handleItemClick = () => {
    setIsOpen(false); // Close the menu when an item is clicked
}
    
    return (
        <div className='min-w-[200px] max-w-[300px]' id="hamburgerMenu" >            
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="grid col-start-1 col-span-3">
                <CollapsibleTrigger>
                <div className='cursor-pointer'>
                    <Image
                        src="/hamburger.svg"
                        alt="menu"
                        width={30}
                        height={30}
                        priority />  
                </div>
                    
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-stone-900 shadow-(--shadow) " id='hamburgerMenuItems' onClick={handleItemClick}>
                    {HamburgerLinks()}
                    
                </CollapsibleContent>
            </Collapsible>
        </div>
    )}


