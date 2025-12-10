'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyToken, refreshToken } from  '../scripts/tokenHandling';

export default function SecureLandingPage() {
    
    // Router
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        // Only display this page if the user is authenticated
        if (!verifyToken()) {
            router.push('/scenarios/login');
        } else {
            setIsVerifying(false);
        }
    }, [router]);

    // Show loading state while verifying
    if (isVerifying) {
        return null;
    }
    
    return (<div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">
        Secure landing page
        <div>
            <Link href ='/scenarios/password-reset'>Reset password</Link>
        </div>
    </div>
    );
}