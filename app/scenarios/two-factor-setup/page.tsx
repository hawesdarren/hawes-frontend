'use client'

import { useState } from "react";;
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation';
import { useQRCode } from 'next-qrcode';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Skeleton } from "@/components/ui/skeleton"

export default function TwoFactorRegistration() {
    // Router
    const router = useRouter();
    // 2fa QR Code state
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [isLoadingQr, setIsLoadingQr] = useState<boolean>(true);
    // QR Code generator
    const { Image } = useQRCode();
    // OTP value
    const [otp, setOtp] = useState('');
    // Error message state
    const [errorMessage, setErrorMessage] = useState<string>('');
    // QR Image loading error state
    const [qrImageErrorMessage, setQrImageErrorMessage] = useState<string>('');

    // Fetch QR code on component mount
    React.useEffect(() => {
        async function fetchQrCode() {
            try {
                // Get email from session storage to make QR code image
                const token = localStorage.getItem('token');
                
                // Make API call to get Totp token
                const setupTfaResponse =  await fetch('/api/authentication/tfa/setup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                    
                });
                if (setupTfaResponse.status === 401) {
                    setQrImageErrorMessage(`Looks like your session has expired. Login and setup TFA again.`);
                }
                else if(!setupTfaResponse.ok){
                    // Handle error response
                    setQrImageErrorMessage('Failed to create QR code. Please try refresh the page.');
                }
               
                else {
                    const data = await setupTfaResponse.json();
                    console.log("Response from /api/authentication/tfa/setup:", data);
                    setQrCodeUrl(data.keyUri);
                }
                
            } catch (error) {
                setQrImageErrorMessage('Failed to create QR code. Please try refresh the page.');
            } finally {
                setIsLoadingQr(false);
            }
        }
        fetchQrCode();
    }, []);

    // Enable TFA function
    async function verifyTfaCode() {
        const token = localStorage.getItem('token');
        const messageBody = {
            enableTfa: true,
            tfaCode: otp,
        };
        console.log("Verifying TFA code with payload:", messageBody);
        // Call TFA enable API here
        const result = await fetch('/api/authentication/tfa/enable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify( messageBody ),
        });
        if(!result.ok){
            // Handle error response
            setErrorMessage('Unexpected error. Please try again.');
            // Clear OTP input
            setOtp('');
            return;
        }
        else {
            const data = await result.json();
            // On Success enable TFA and nav to secure landing
            if(data.success){
                router.push('/scenarios/login');
            }
            else {
                console.log("TFA setup failed, please try again.");
                // Clear OTP input
                setOtp('');
                // Show error message
                setErrorMessage('Invalid OTP code. Please try again.')

            }
        }
   
    }

    // function for tfa input - automatically verify when 6 digits entered
    React.useEffect(() => {
        if (otp.length === 6) {
            verifyTfaCode();
        }
    }, [otp]);

    return (
        <div>
            
            <main className="container mx-auto p-4">
                <h4 className="text-2xl font-bold mb-4 text-center">Two-Factor Authentication Setup</h4>
                <FieldSet>
                    <FieldGroup>
                        <FieldLabel>
                            <FieldDescription className="text-center">
                                Use your authenticator app to scan the QR code below.
                            </FieldDescription>
                        </FieldLabel>
                        <Field>
                            <div className="flex justify-center">
                                {isLoadingQr || !qrCodeUrl ? (
                                    <Skeleton className="w-48 h-48"/>
                                ) : (
                                    <div className="w-48 h-48">
                                        <Image
                                            text={qrCodeUrl}
                                            options={{
                                                margin: 2,
                                                scale: 4,
                                                width: 200,
                                                color: {
                                                    dark: '#000000',
                                                    light: '#FFFFFF',
                                                },
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </Field>
                        <FieldError>
                            <div className="text-center text-red-600" data-testid="qr-image-error">
                                {qrImageErrorMessage}
                            </div>
                        </FieldError>
                        <Field>
                            <div className="flex flex-col items-center gap-4">
                                <p>Can't scan the QR code?</p>
                                <Button
                                    variant="default"
                                    
                                    onClick={() => {
                                        navigator.clipboard.writeText(qrCodeUrl);
                                    }}
                                    >
                                        Copy the QR key to clipboard
                                </Button>
                            </div>
                        </Field>
                        <Field>
                            <div className="flex flex-col items-center gap-4">
                                        <h4 className="text-center">Enter the OTP from your authenticator app</h4>
                                        <div>
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
                            </div>
                        </Field>
                        <FieldError>
                            <div className="text-center text-red-600" data-testid="error-message">
                                {errorMessage}
                            </div>
                        </FieldError>
                        <Field>
                            <div className="flex justify-center">
                                <Button 
                                    variant="default"
                                    onClick={() => router.push('/scenarios/login')}>
                                    Skip TFA setup, Login</Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <div className="mt-3 text-center">
                    <p id="error-message" data-testid="error-message">{errorMessage}</p>
                </div>
            </main>
        </div>
    );
}
