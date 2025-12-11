'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyToken, refreshToken, clearTokens } from  '../scripts/tokenHandling';
import { Button } from '@/components/ui/button';

export default function SecureLandingPage() {
    
    // Router
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            // Check token not expired, refresh if needed
            await refreshToken();
            // Only display this page if the user is authenticated
            if (!verifyToken()) {
                router.push('/scenarios/login');
            } else {
                setIsVerifying(false);
            }
        }
        checkAuth();
    }, [router]);

    // Show loading state while verifying
    if (isVerifying) {
        return null;
    }
    
    return (<div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center ">
        <h4>Secure landing page</h4>
        <div className='flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-fit'>
            <Button 
                asChild 
                className="w-68 sm:h-3/4"
                onClick={clearTokens}>
                <Link href ='/scenarios/logout'>Logout</Link>
            </Button>
            <Button asChild className="w-68 sm:h-3/4">
                <Link href ='/scenarios/password-reset?changePassword=true'>Change password</Link>
            </Button>
            <Button asChild className="w-68 sm:h-3/4">
                <Link href ='/scenarios/two-factor-setup'>Enable two-factor authentication</Link>
            </Button>
            <Button asChild className="w-68 sm:h-3/4">
                <Link href ='/scenarios/todo'>todo</Link>
            </Button>
            
        </div>
    </div>
    );
}