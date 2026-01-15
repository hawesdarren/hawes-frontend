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
            if(result.status === 401){
                setErrorMessage('Your session has expired., Please login again and setup TFA.');
            }
            else {
                setErrorMessage('Unexpected error. Please try again.');
            }
            
            // Clear OTP input
            setOtp('');
            return;
        }
        else {
            const data = await result.json();
            // On Success enable TFA and nav to secure landing
            if(data.success){
                // Store tokens in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                // Navigate to secure landing
                router.push('/scenarios/secure-landing');
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

    // Copy QR code URL to clipboard
    const copyToClipboard = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(qrCodeUrl);
                console.log('QR key copied to clipboard');
            } else {
                console.error('Clipboard API not available');
                alert('Clipboard not available. Please copy manually: ' + qrCodeUrl);
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert('Failed to copy to clipboard');
        }
    };

    return (
        <div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">
            
            <div className="flex order-2  flex flex-col justify-self-center p-3 w-fit">
                <div className="flex flex-col gap-2 w-80 sm:w-140">
                <p className="text-center justify-self-center">Two-Factor Authentication Setup</p>
                <FieldSet>
                    <FieldGroup>
                        <FieldDescription className="text-center">Use your authenticator app to scan the QR code below.</FieldDescription>
                        <Field>
                            <div className="flex justify-center">
                                {isLoadingQr || !qrCodeUrl ? (
                                    <Skeleton 
                                        className="w-48 h-48"
                                        id="tfa-setup-qr-skeleton"
                                        data-testid="tfa-setup-qr-skeleton"
                                        />
                                ) : (
                                    <div className="w-48 h-48"
                                         id="tfa-setup-qr-image"
                                         data-testid="tfa-setup-qr-image">
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
                            <div className="text-center" data-testid="qr-image-error" id="qr-image-error">
                                {qrImageErrorMessage}
                            </div>
                        </FieldError>
                        <Field>
                            <div className="flex flex-col items-center gap-4">
                                <p>On your phone and can't scan the QR code?<br/>
                                Click the button below to copy the QR key and setup your authenticator app manually</p>
                                <Button
                                    variant="default"
                                    className="w-full sm:w-1/2"
                                    id="copy-qr-key-button"
                                    data-testid="copy-qr-key-button"
                                    onClick={copyToClipboard}
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
                                            id="tfa-setup-otp-input"
                                            data-testid="tfa-setup-otp-input"
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
                            <div className="text-center " data-testid="error-message" id="error-message">
                                {errorMessage}
                            </div>
                        </FieldError>
                        <Field>
                            <div className="flex justify-center">
                                <Button 
                                    variant="default"
                                    id="tfa-setup-no-tfa-login-button"
                                    data-testid="tfa-setup-no-tfa-login-button"
                                    className="w-full sm:w-1/2"
                                    onClick={() => router.push('/scenarios/secure-landing')}>
                                    I don't want TFA, Skip</Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                </div>
            </div>
        </div>
    );
}
