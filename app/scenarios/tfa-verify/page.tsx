'use client'

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import React, { useMemo } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TfaVerifyPage() {
    // Router 
    const router = useRouter();
    // Search
    const search = useSearchParams();
    // OTP value and state
    const [otp, setOtp] = useState('');
    const [otpDisabled, setOtpDisabled] = useState<boolean>(false);
    // Error message state
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showLoginLink, setShowLoginLink] = useState<boolean>(false);

    // Get tempPassword flag from query parameters
    const isTempPassword = useMemo(() => {
        return search.get('tempPassword') === 'true';
    }, [search]);
    
    // function for tfa input - automatically verify when 6 digits entered
        React.useEffect(() => {
            if (otp.length === 6) {
                verifyTfaCode();
            }
        }, [otp]);

    // Verify TFA code function
    async function verifyTfaCode() {
        // Disable OTP input while verifying
        setOtpDisabled(true);
        // todo verify token not expired and refresh if needed
  
        try {
            const verifyTfaResponse =  await fetch('/api/authentication/tfa/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
                },
                body: JSON.stringify({ tfaCode: otp }),
            });

            if (verifyTfaResponse.status === 200) {
                // 200 just means API called succesfully not that the tfa code was verifed
                const data = await verifyTfaResponse.json();
                if(data.success && data.authenticated){
                
                    // TFA verified successfully
                    // Save the tokens to local storage
                    
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    if(isTempPassword){
                        // Redirect to password reset page
                        router.push('/scenarios/password-reset?tempPassword=true');
                        return;
                    }
                    else {
                        // Redirect to secure landing page
                        router.push('/scenarios/secure-landing');
                        return;
                    }
                }
                else {
                    // TFA verification failed
                    setErrorMessage('Invalid code. Please try again.');
                    // Clear the OTP input
                    setOtp('');
                }  
            }
            else if (verifyTfaResponse.status === 401) {
                // Unauthorized - likely invalid or expired token
                setErrorMessage('Your session has expired.');
                setShowLoginLink(true);
            }    
            else {
                // TFA verification failed
                setErrorMessage('An error occurred during verification. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred during verification. Please try again.');
        }
        finally {   
            // Enable OTP input again
            setOtpDisabled(false);
        }
    }

    return (
        <div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">
            <div className="flex flex-col gap-2 w-80 sm:w-140 justify-self-center p-3 w-fit ">
                <div className="flex flex-col items-center mt-6 text-center">
                    <p>Enter the code from your authenticator app to verify your identity.</p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-3">
                <InputOTP 
                    maxLength={6} 
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otp}
                    disabled={otpDisabled}
                    onChange={setOtp}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>                    
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3}/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                        </InputOTPGroup>
                </InputOTP> 
                </div>
                <div className="flex flex-col items-center mt-3 errorMessage" 
                    data-testid="tfa-verify-otp-error-message">
                    <p>{errorMessage}</p>
                    {showLoginLink && (
                        <Link href="/scenarios/login" className="hover:underline mt-2 cursor-pointer">
                            Please log in again.
                        </Link>
                    )}
                </div>
                <div className="flex flex-col items-center mt-3">
                <Link href="/scenarios/login" className="w-full sm:w-1/2 mt-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        >Cancel
                    </Button>
                </Link>
                </div>
            </div>
  
        </div>

    );
}