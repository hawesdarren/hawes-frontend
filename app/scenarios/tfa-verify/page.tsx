'use client'

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function TfaVerifyPage() {

    // OTP value
    const [otp, setOtp] = useState('');
    // Error message state
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    // function for tfa input - automatically verify when 6 digits entered
        React.useEffect(() => {
            if (otp.length === 6) {
                verifyTfaCode();
            }
        }, [otp]);

    // Verify TFA code function
    async function verifyTfaCode() {
        const token = localStorage.getItem('token');

        try {
            const verifyTfaResponse =  await fetch('/api/authentication/tfa/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ tfaCode: otp }),
            });

            if (verifyTfaResponse.status === 200) {
                // 200 just means API called succesfully not that the tfa code was verifed
                const data = await verifyTfaResponse.json();
                if(data.success && data.authenticated){
                
                    // TFA verified successfully
                    console.log('TFA verification successful');
                    // Save the tokens to local storage
                    
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    console.log('Token stored in local storage after TFA verification');
                    // Redirect to secure landing page
                    window.location.href = '/scenarios/secure-landing';
                }
                else {
                    // TFA verification failed
                    setErrorMessage('Invalid code. Please try again.');
                }
                
               
            } else {
                // TFA verification failed
                setErrorMessage('An error occurred during verification. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred during verification. Please try again.');
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center mt-6">
                <h4>Enter the code from your authenticator app to verify your identity.</h4>
            </div>
            <div className="flex flex-col items-center gap-4 mt-3">
                <InputOTP 
                    maxLength={6} 
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otp}
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
            <div className="flex flex-col items-center mt-3"
                 data-testid="tfa-verify-otp-error-message">
                {errorMessage}
            </div>
            <div className="flex flex-col items-center mt-3">
                <Link href = "scenarios/login" passHref className="w-full sm:w-1/2 mt-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        >Cancel
                    </Button>
                </Link>
            </div>
        </div>

    );
}