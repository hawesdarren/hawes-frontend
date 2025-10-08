'use client';

import { useEffect, useState } from "react";

export default function DarkMode() {
  
    
   const [isDarkMode, setIsDarkMode] = useState(false);

   useEffect(() => {
    if (typeof window !== 'undefined') {
            // Check localStorage.theme or fallback to system preference
            const theme = localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
            if (localStorage.theme === 'dark') {
                setIsDarkMode(true);
                document.documentElement.classList.add('dark'); // Add dark mode class
            } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove('dark'); // Remove dark mode class
            }
        }
    },[]); // Run only once on component mount

    function toggleDarkMode() {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'dark') {
                localStorage.theme = 'light';
                document.documentElement.classList.remove('dark');
                setIsDarkMode(false);
            } else {
                localStorage.theme = 'dark';
                document.documentElement.classList.add('dark');
                setIsDarkMode(true);
            }
        }
    }   

    return (
        <div onClick={toggleDarkMode} className="cursor-pointer m-1" id="darkModeToggle" data-testid="darkModeToggle" 
            tabIndex={0} onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                    toggleDarkMode();
                }
            }}>
                {isDarkMode ? <h4>&#9788;</h4> : <h4>&#9789;</h4>}
        </div>
    )
}