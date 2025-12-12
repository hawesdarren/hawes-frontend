'use client'

import { useState, useMemo } from "react";;

import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"
import { useRouter, useSearchParams } from 'next/navigation';
import React from "react";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
    // Router
    const router = useRouter();
    //Email state
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [emailTouched, setEmailTouched] = useState<boolean>(false);

    // Handle email input change

    const handleEmailBlur = () => {
        setEmailTouched(true);
    
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    return (<div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center ">
        <div>
            <FieldSet>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    router.push('/scenarios/login');
                }}>
                    <FieldGroup>
                        <Field>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <FieldLabel htmlFor="email" className="sm:min-w-36 sm:max-w-48">Email</FieldLabel>
                                <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
                                        aria-invalid={!!emailError}
                                        aria-describedby="email-error"
                                    />
                                </div>
                                {emailError && (
                                    <FieldError id="email-error">{emailError}</FieldError>
                                )}
                            </Field>
                    </FieldGroup>
                </form>
            </FieldSet>
        </div>
    </div>
    );
}
