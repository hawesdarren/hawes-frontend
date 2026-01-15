'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();
return (
    <div>
        <p>You have successfully logged out of your account.</p>
        <p>
            
            <Button 
                type="button"
                variant="link" 
                className="w-full mt-4 justify-start text-base text-(--text-color)"
                onClick={() => router.push('/scenarios/login')}
                >Login again
            </Button>
        </p>
        
    </div>
)}