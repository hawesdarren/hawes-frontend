'use client'

import { useState } from "react";;
import Header from '../../components/header'
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation';
import React from "react";

export default function TwoFactorRegistration() {
    // Router
    const router = useRouter();
    // 2fa QR Code state
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [isLoadingQr, setIsLoadingQr] = useState<boolean>(true);

    // Fetch QR code on component mount
    React.useEffect(() => {
        async function fetchQrCode() {
            try {
                // Simulate API call
                const response = await new Promise<{ qrCodeUrl: string }>((resolve) =>
                    setTimeout(() => resolve({ qrCodeUrl: 'https://example.com/qrcode.png' }), 1000)
                );
                setQrCodeUrl(response.qrCodeUrl);
            } catch (error) {
                console.error("Failed to fetch QR code:", error);
            } finally {
                setIsLoadingQr(false);
            }
        }
        fetchQrCode();
    }, []);

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Two-Factor Authentication Setup</h1>
                <FieldSet>
                    <FieldGroup>
                        <FieldLabel>
                            <FieldTitle>Scan the QR Code</FieldTitle>
                            <FieldDescription>
                                Use your authenticator app to scan the QR code below.
                            </FieldDescription>
                        </FieldLabel>
                        <FieldContent>
                            {isLoadingQr ? (
                                <Spinner />
                            ) : (
                                <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                            )}
                        </FieldContent>
                    </FieldGroup>
                </FieldSet>
                
            </main>
        </div>
    );
}
